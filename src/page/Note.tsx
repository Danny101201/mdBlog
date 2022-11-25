import React from 'react'
import { Stack, Button } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router-dom'
import { useNote } from './NoteLayout'
import remarkGfm from 'remark-gfm'
interface NoteDetailsProps {
  onDeleteNote: (id: string) => void
}
function NoteDetails({ onDeleteNote }: NoteDetailsProps) {
  const note = useNote()

  return (
    <div className='py-10'>
      <div className='flex items-start justify-between mb-20'>
        <div>
          <p className='text-3xl font-semibold'>{note.title}</p>
          <div className='flex gap-2'>
            {note.tags.map(tag => (
              <span key={tag.id} className='bg-blue-500 text-white px-2 rounded-md'>{tag.label}</span>
            ))}
          </div>
        </div>
        <Stack direction='horizontal' gap={2} className="justify-end">
          <Link to="edit">
            <Button variant='primary' >edit</Button>
          </Link>
          <Button variant='outline-danger' onClick={() => onDeleteNote(note.id)}>delete</Button>
          <Link to="..">
            <Button variant='outline-secondary' type='button'>back</Button>
          </Link>
        </Stack>
      </div>
      <ReactMarkdown remarkPlugins={[remarkGfm]} >{note.markdown}</ReactMarkdown>
    </div>
  )
}


export default NoteDetails