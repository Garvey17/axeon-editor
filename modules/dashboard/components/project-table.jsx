
"use client"

import Image from "next/image"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import { MoreHorizontal, Edit3, Trash2, ExternalLink, Copy, Download, Eye } from "lucide-react"
import { toast } from "sonner"

export default function ProjectTable({
  projects,
  onUpdateProject,
  onDeleteProject,
  onDuplicateProject,
  onMarkasFavorite,
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [editData, setEditData] = useState({ title: "", description: "" })
  const [isLoading, setIsLoading] = useState(false)
  const [favoutrie, setFavourite] = useState(false)

  const handleEditClick = (project) => {
    setSelectedProject(project)
    setEditData({
      title: project.title,
      description: project.description || ""
    })
    setEditDialogOpen(true)
  }

  const handleDeleteClick = async (project) => {
    setSelectedProject(project)
    setDeleteDialogOpen(true)
  }

  const handleUpdateProject = async () => {
    if (!selectedProject || !onUpdateProject) return

    setIsLoading(true)
    try {
      await onUpdateProject(selectedProject.id, editData)
      setEditDialogOpen(false)
      toast.success('Project updated successfuly')
    } catch (error) {
      toast.error("Failed to update project")
      console.error("Error updating project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMarkasFavorite = async (project) => {
    //    Write your logic here
  }

  const handleDeleteProject = async () => {
    if (!selectedProject || !onDeleteProject) return

    setIsLoading(true)
    try {
      await onDeleteProject(selectedProject.id)
      setDeleteDialogOpen(false)
      toast.success('Project deleted successfuly')
    } catch (error) {
      toast.error("Failed to delete project")
      console.error("Error deleting project:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDuplicateProject = async (project) => {
    if (!onDuplicateProject) return;

    setIsLoading(true);
    try {
      await onDuplicateProject(project.id);
      toast.success("Project duplicated successfully");
    } catch (error) {
      toast.error("Failed to duplicate project");
      console.error("Error duplicating project:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const copyProjectUrl = (projectId) => {
    const url = `${window.location.origin}/playground/${projectId}`
    navigator.clipboard.writeText(url)
    toast.success("Copied to clipboard")
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-lg overflow-hidden w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>User</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(projects) && projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <Link href={`/playground/${project.id}`} className="hover:underline">
                      <span className="font-semibold">{project.title}</span>
                    </Link>
                    <span className="text-sm text-gray-500 line-clamp-1">{project.description}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                    {project.template}
                  </Badge>
                </TableCell>
                <TableCell>{format(new Date(project.createdAt), "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={project.user.image || "/placeholder.svg"}
                        alt={project.user.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-sm">{project.user.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href={`/playground/${project.id}`} className="flex items-center">
                          <Eye className="h-4 w-4 mr-2" />
                          Open Project
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/playground/${project.id}`} target="_blank" className="flex items-center">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Open in New Tab
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleEditClick(project)}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Edit Project
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleDuplicateProject(project)}>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => copyProjectUrl(project.id)}>
                        <Download className="h-4 w-4 mr-2" />
                        Copy URL
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDeleteClick(project)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Project
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 w-full">
        {Array.isArray(projects) && projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-4 space-y-3 bg-card">
            {/* Header with title and actions */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <Link href={`/playground/${project.id}`} className="hover:underline">
                  <h3 className="font-semibold text-base truncate">{project.title}</h3>
                </Link>
                {project.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href={`/playground/${project.id}`} className="flex items-center">
                      <Eye className="h-4 w-4 mr-2" />
                      Open Project
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/playground/${project.id}`} target="_blank" className="flex items-center">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Open in New Tab
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleEditClick(project)}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit Project
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDuplicateProject(project)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => copyProjectUrl(project.id)}>
                    <Download className="h-4 w-4 mr-2" />
                    Copy URL
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDeleteClick(project)}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Project
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">
                {project.template}
              </Badge>
              <span className="text-muted-foreground">
                {format(new Date(project.createdAt), "MMM d, yyyy")}
              </span>
            </div>

            {/* User info */}
            <div className="flex items-center gap-2 pt-2 border-t">
              <div className="w-6 h-6 rounded-full overflow-hidden">
                <Image
                  src={project.user.image || "/placeholder.svg"}
                  alt={project.user.name}
                  width={24}
                  height={24}
                  className="object-cover"
                />
              </div>
              <span className="text-sm text-muted-foreground">{project.user.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Project Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Make changes to your project details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={editData.title}
                onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter project title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editData.description}
                onChange={(e) => setEditData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Enter project description"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="button" onClick={handleUpdateProject} disabled={isLoading || !editData.title.trim()}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedProject?.title}"? This action cannot be undone. All files and
              data associated with this project will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProject}
              disabled={isLoading}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isLoading ? "Deleting..." : "Delete Project"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

