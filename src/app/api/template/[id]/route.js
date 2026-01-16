import { readTemplateStructureFromJson, saveTemplateStructureToJson } from "../../../../../modules/playground/lib/path-to-json";
import { db } from "@/lib/db";
import { templatePaths } from "@/lib/template";
import path from "path"
import fs from "fs/promises"
import { NextRequest } from "next/server";
import { success } from "zod";



function validateJsonStructure(data) {
    try {
        JSON.parse(JSON.stringify(data))
        return true
    } catch (error) {
        console.error("Invalid JSON structure", error)
        return false

    }
}


export async function GET(request, { params }) {
    const { id } = await params

    if (!id) {
        return Response.json({ error: "Missing Playground ID" }, { status: 400 })
    }

    try {
        const playground = await db.playground.findUnique({
            where: { id },
            include: {
                templateFiles: {
                    select: {
                        content: true
                    }
                }
            }
        })

        if (!playground) {
            console.error(`Playground not found: ${id}`)
            return Response.json({ error: "Playground not found" }, { status: 404 })
        }

        // Check if template already exists in database
        if (playground.templateFiles && playground.templateFiles.length > 0) {
            const savedTemplate = playground.templateFiles[0].content

            // If it's a string, parse it
            const templateData = typeof savedTemplate === 'string'
                ? JSON.parse(savedTemplate)
                : savedTemplate

            console.log(`Returning saved template for playground: ${id}`)
            return Response.json({ success: true, templateJson: templateData }, { status: 200 })
        }

        // Template doesn't exist in DB, generate from filesystem
        console.log(`Generating template from filesystem for playground: ${id}`)

        const templateKey = playground.template
        const templatePath = templatePaths[templateKey]

        if (!templatePath) {
            console.error(`Template path not found for key: ${templateKey}`)
            return Response.json({ error: "Template path not found" }, { status: 404 })
        }

        // Use /tmp directory for Vercel compatibility
        const isProduction = process.env.NODE_ENV === 'production'
        const outputDir = isProduction ? '/tmp' : path.join(process.cwd(), 'output')

        // Ensure output directory exists (only needed in development)
        if (!isProduction) {
            try {
                await fs.mkdir(outputDir, { recursive: true })
            } catch (err) {
                console.error("Error creating output directory:", err)
            }
        }

        const inputPath = path.join(process.cwd(), templatePath)
        const outputFile = path.join(outputDir, `${templateKey}-${id}.json`)

        console.log(`Input path: ${inputPath}`)
        console.log(`Output file: ${outputFile}`)

        // Check if input path exists
        try {
            await fs.access(inputPath)
        } catch (err) {
            console.error("Template path does not exist:", inputPath)
            console.error("Error details:", err)
            return Response.json({
                error: "Template files not found on server",
                details: `Path: ${templatePath}`,
                inputPath: inputPath
            }, { status: 500 })
        }

        // Generate template structure
        await saveTemplateStructureToJson(inputPath, outputFile)
        const result = await readTemplateStructureFromJson(outputFile)

        if (!validateJsonStructure(result.items)) {
            console.error("Invalid JSON structure generated")
            return Response.json({ error: "Invalid JSON structure" }, { status: 500 })
        }

        // Save to database for future use
        try {
            await db.templateFile.create({
                data: {
                    playgroundId: id,
                    content: JSON.stringify(result)
                }
            })
            console.log(`Template saved to database for playground: ${id}`)
        } catch (dbError) {
            console.error("Error saving template to database:", dbError)
            // Continue anyway - we can still return the generated template
        }

        // Clean up temp file
        try {
            await fs.unlink(outputFile)
        } catch (err) {
            console.warn("Could not delete temp file:", err)
        }

        return Response.json({ success: true, templateJson: result }, { status: 200 })
    } catch (error) {
        console.error("Error generating template JSON:", error)
        console.error("Error stack:", error.stack)
        console.error("Error name:", error.name)
        console.error("Error message:", error.message)
        return Response.json({
            error: "Failed to generate template",
            message: error.message,
            name: error.name
        }, { status: 500 })
    }
}
