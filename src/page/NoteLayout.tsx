import React from 'react'
import { useParams, Navigate, Outlet, useOutletContext } from 'react-router-dom'

interface NoteLayoutProps {
  noteWithTags: NoteWithTags[]
}
function NoteLayout({ noteWithTags }: NoteLayoutProps) {
  const { id } = useParams()
  const note = noteWithTags.find(n => n.id === id)
  if (note === undefined) return <Navigate to="/" replace />
  return (
    <Outlet context={note}/>
  )
}
export const useNote = () => {
  return useOutletContext<NoteWithTags>()
}
export default NoteLayout