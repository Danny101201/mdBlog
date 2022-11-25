import React from 'react'
import NoteForm from '@/component/NoteForm';
interface NewNotesProps {
  onSubmit: (data: NoteData) => void
  addTags: (tag: Tag) => void
  availableTags: Tag[]
}
function NewNotes({ onSubmit, addTags, availableTags }: NewNotesProps) {

  return (
    <div className='text-3xl font-semibold py-10'>
      <p>NewNotes</p>
      <NoteForm onSubmit={onSubmit} addTags={addTags} availableTags={availableTags} />
    </div>
  )
}

export default NewNotes