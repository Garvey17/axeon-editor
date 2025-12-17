"use client"
import { useParams } from 'next/navigation'
import React from 'react'
import { usePlayground } from '../../../../modules/playground/hooks/usePlayground'
import { getPlaygroundById } from '../../../../modules/playground/actions'

const MainPlaygroundPage = () => {
    const {id} = useParams()
    const {playgroundData, templateData, isLoading, error, saveTemplateData } = usePlayground(id)
    console.log("template data:", templateData);
    console.log("playground data:", playgroundData);
    
    
  return (
    <div>
        params: {id}
    </div>
  )
}

export default MainPlaygroundPage