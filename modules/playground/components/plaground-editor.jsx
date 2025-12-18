"use client"
import { useRef, useEffect, useCallback } from "react"
import Editor from "@monaco-editor/react"
import { configureMonaco, defaultEditorOptions, getEditorLanguage } from "../lib/editor-config"


const PlaygroundEditor = ({
    activeFile,
    content,
    onContentChange
}) => {

    const editorRef = useRef(null)
    const monacoRef = useRef(null)

    const handleEditorDidMount = (editor, monaco)=>{
        editorRef.current = editor
        monacoRef.current = monaco
        console.log("Editor instance mounted:", !!editorRef.current);
        editor.updateOptions({
            ...defaultEditorOptions
        })

        configureMonaco(monaco)
        updateEditorLanguage()
    }

    const updateEditorLanguage = () => {
        if(!activeFile || !monacoRef.current || !editorRef.current) return
        const model = editorRef.current.getModel()
        if(!model) return

        const language = getEditorLanguage(activeFile.fileExtension || "")

        try {
            monacoRef.current.editor.setModelLanguage(model, language)
        } catch (error) {
            console.warn("Failed to set editor language:", error)
        }
    }

    useEffect(()=>{
        updateEditorLanguage()
    }, [])
  return (
    <div className="h-full relative">
        <Editor
        height={"100%"}
        value={content}
        onChange={(value) => onContentChange(value || "")}
        onMount={handleEditorDidMount}
        language={activeFile ? getEditorLanguage(activeFile.fileExtension || "") : "plaintext"}
        options={defaultEditorOptions}
        />
    </div>
  )
}

export default PlaygroundEditor