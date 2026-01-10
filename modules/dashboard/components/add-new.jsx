
"use client";

import { Button } from "@/components/ui/button"
// import { createPlayground } from "@/features/playground/actions";
import { Plus } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { toast } from "sonner";
import TemplateSelectingModal from "./template-selecting-modal";
import { createPlaygound } from "../actions";


const AddNewButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);


  const router = useRouter()

  const handleSubmit = async (data) => {
    setSelectedTemplate(data)
    const res = await createPlaygound(data)
    toast.success("Playground created successfully")

    setIsModalOpen(false)
    router.push(`/playground/${res?.id}`)
  }

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group px-4 sm:px-6 py-4 sm:py-6 flex flex-col sm:flex-row justify-between items-center border border-orange-200 rounded-lg bg-gradient-to-br from-orange-50 to-white cursor-pointer 
        transition-all duration-300 ease-in-out
        hover:border-orange-500 hover:scale-[1.02]
        shadow-[0_2px_10px_rgba(249,115,22,0.1)]
        hover:shadow-[0_10px_30px_rgba(249,115,22,0.2)]"
      >
        <div className="flex flex-row justify-center items-start gap-3 sm:gap-4 w-full sm:w-auto">
          <Button
            variant={"outline"}
            className="flex justify-center items-center bg-white border-orange-300 text-orange-600 group-hover:bg-orange-500 group-hover:border-orange-500 group-hover:text-white transition-colors duration-300 shrink-0"
            size={"icon"}
          >
            <Plus size={24} className="sm:w-[30px] sm:h-[30px] transition-transform duration-300 group-hover:rotate-90" />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-lg sm:text-xl font-bold text-orange-600">Add New</h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-[220px]">Create a new playground</p>
          </div>
        </div>

        <div className="relative overflow-hidden mt-4 sm:mt-0">
          <Image
            src={"/add-new.svg"}
            alt="Create new playground"
            width={120}
            height={120}
            className="sm:w-[150px] sm:h-[150px] transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Template Selecting Model here */}
      <TemplateSelectingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  )
}

export default AddNewButton
