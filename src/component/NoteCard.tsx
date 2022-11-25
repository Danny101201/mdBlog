import React from 'react'
import { Link } from 'react-router-dom'

interface NoteCardProps {
  node: NoteWithTags
}
function NoteCard({ node }: NoteCardProps) {
  return (
    <Link to={node.id} className="decoration-0 flex-1">
      <div className='border border-1 shadow-sm  min-w-[250px] h-[150px] flex flex-col items-center justify-center p-4 gap-2 cursor-pointer hover:-translate-y-2 hover:shadow-lg'>
        <p className='m-0 text-2xl'>{node.title}</p>
        <div className='flex items-center justify-center gap-1 flex-wrap'>
          {node.tags.map(tag => (
            <span key={tag.id} className='bg-blue-500 text-white px-2 rounded-md'>{tag.label}</span>
          ))}
        </div>
      </div>


    </Link>
  )
}

export default NoteCard