import React from 'react'
import AddNewButton from '../../../modules/dashboard/components/add-new'
import AddRepo from '../../../modules/dashboard/components/add-repo'
import { deleteProjectById, duplicateProjectById, editProjectById, getAllPlaygroundForUser } from '../../../modules/dashboard/actions'
import EmptyState from '../../../modules/dashboard/components/empty-state'
import ProjectTable from '../../../modules/dashboard/components/project-table'

async function page() {
  const playgrounds = await getAllPlaygroundForUser()
  return (
    <div className='flex flex-col justify-start items-center min-h-screen mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 w-full'>
        <AddNewButton />
        <AddRepo />

      </div>

      <div className='mt-6 sm:mt-8 md:mt-10 flex flex-col justify-center items-center w-full'>
        {playgrounds && playgrounds.length === 0 ? (
          <EmptyState />
        ) : (
          <ProjectTable
            projects={playgrounds || []}
            onDeleteProject={deleteProjectById}
            onUpdateProject={editProjectById}
            onDuplicateProject={duplicateProjectById}
          />
        )}
      </div>
    </div>
  )
}

export default page