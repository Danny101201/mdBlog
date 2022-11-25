import React from 'react'
import NoteForm from '@/component/NoteForm';
import { useNote } from './NoteLayout';
interface EditNoteProps {
  onSubmit: (data: NoteData, id: string) => void
  addTags: (tag: Tag) => void
  availableTags: Tag[]
}

function EditNote({ onSubmit, addTags, availableTags }: EditNoteProps) {
  const note = useNote()
  return (
    <div className='text-3xl font-semibold py-10'>
      <p>EditNote</p>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data) => onSubmit(data, note.id)}
        addTags={addTags}
        availableTags={availableTags}
      />
    </div>
  )
}

export default EditNote