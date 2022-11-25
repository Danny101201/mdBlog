import { useEffect, useMemo, useState } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Badge, Container } from 'react-bootstrap'
import NewNotes from '@/page/NewNotes';
import NoteList from '@/page/NoteList';
import NoteLayout from '@/page/NoteLayout';
import { useLocalStorage } from './hooks/useLocalStorage';
import { v4 as uuids4 } from 'uuid';
import NoteDetails from './page/Note';
import EditNote from './page/EditNote';

function App() {
  const router = useNavigate()
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", [])
  const [allTags, setTags] = useLocalStorage<Tag[]>("tags", [])
  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: allTags.filter(tag => {
          return note.tagsIds.includes(tag.id)
        }
        )
      }
    })
  }, [notes, allTags])
  console.log(allTags)

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(preState => ([...preState, { ...data, id: uuids4(), tagsIds: tags.map(tag => tag.id) }]))
  }
  function onUpdateNote({ tags, ...data }: NoteData, id?: string,) {
    setNotes(preState => preState.map(note => {
      if (note.id === id) {
        return { ...note, ...data, tagsIds: tags.map(tag => tag.id) }
      } else {
        return note
      }
    }))
  }
  const onDeleteNote = (id: string) => {
    setNotes(preState => preState.filter(n => n.id !== id))
    router('/', { replace: true })
  }
  function addTags(tag: Tag) {
    setTags(preState => ([...preState, tag]))
  }
  function deleteTags(id: string) {
    setTags(preState => preState.filter(tag => tag.id !== id))
  }
  function updateTags(id: string, label: string) {
    setTags(preState => preState.map(tag => {
      if (tag.id === id) {
        return { ...tag, label }
      } else {
        return tag
      }
    }))
  }
  return (
    <Container className=''>
      <Routes>
        <Route path='/' element={<NoteList deleteTags={deleteTags} updateTags={updateTags} availableTags={allTags} nodes={noteWithTags} />} />
        <Route path='/new' element={<NewNotes onSubmit={onCreateNote} addTags={addTags} availableTags={allTags} />} />
        <Route path='/:id' element={<NoteLayout noteWithTags={noteWithTags} />}>
          <Route index element={<NoteDetails onDeleteNote={onDeleteNote} />} />
          <Route path='edit' element={<EditNote onSubmit={onUpdateNote} addTags={addTags} availableTags={allTags} />} />
          <Route path='*' element={'error'} />
        </Route>
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App
