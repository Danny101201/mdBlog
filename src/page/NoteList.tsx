import React, { FormEvent, useMemo, useState, useRef } from 'react'
import { Stack, Button, Col, Row, Form, Modal, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select';
import NoteCard from '@/component/NoteCard';

interface NoteListProps {
  availableTags: Tag[]
  nodes: NoteWithTags[]
  deleteTags: (id: string) => void
  updateTags: (id: string, label: string) => void
}
interface TagsModalProps {
  deleteTags: (id: string) => void
  handleClose: () => void
  updateTags: (id: string, label: string) => void
  show: boolean
  availableTags: Tag[]
}
function NoteList({ availableTags, nodes, deleteTags, updateTags }: NoteListProps) {
  const [title, setTitle] = useState<String>('')
  const [tags, setTags] = useState<Tag[]>([])
  const [showModal, setShowModal] = useState(false);
  const filterNotes = useMemo(() => {
    return nodes.filter(node => {
      return (
        (title === '' || node.title.toLowerCase() === title.toLowerCase()) &&
        (tags.length === 0 || tags.every(t => {
          return node.tagsIds.some(nt => nt.includes(t.id))
        }))
      )
    })
  }, [title, tags, availableTags])
  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <div className='py-10 flex flex-col gap-10'>
      <div className='flex items-center justify-between'>
        <div className='text-3xl font-semibold'>Note</div>
        <Stack direction='horizontal' gap={2} className="justify-end">
          <Link to="/new">
            <Button variant='primary' type='submit'>Create</Button>
          </Link>
          <Button variant='outline-secondary' type='button' onClick={() => setShowModal(true)}>Edit Tags</Button>
        </Stack>

      </div>
      <Row>
        <Col>
          <Form.Group controlId='title'>
            <Form.Label>Title</Form.Label>
            <Form.Control required onChange={e => setTitle(e.target.value)}></Form.Control>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId='tags'>
            <Form.Label>tags</Form.Label>
            <ReactSelect
              isMulti
              options={availableTags.map(tag => ({
                label: tag.label,
                value: tag.label,
              }))}
              value={tags.map(tag => ({
                label: tag.label,
                value: tag.label
              }))}
              onChange={tags => {
                setTags(tags.map(tag => ({
                  id: (availableTags.find(t => t.label === tag.label) as Tag).id,
                  label: tag.label
                })))
              }}
            />
          </Form.Group>
        </Col>
      </Row>
      <div>
        <div className='flex items-center lg:justify-start justify-center gap-3 flex-wrap'>
          {filterNotes.map(node => (
            <NoteCard key={node.id} node={node} />
          ))}
          <div className='w-[250px]'></div>
          <div className='w-[250px]'></div>
          <div className='w-[250px]'></div>
          <div className='w-[250px]'></div>
          <div className='w-[250px]'></div>
          <div className='w-[250px]'></div>
          <div className='w-[250px]'></div>
        </div>
      </div>
      <TagsModal updateTags={updateTags} deleteTags={deleteTags} show={showModal} handleClose={handleClose} availableTags={availableTags} />
    </div >
  )
}

export default NoteList

const TagsModal = ({ show, handleClose, availableTags, deleteTags, updateTags }: TagsModalProps) => {
  console.log(availableTags)
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {availableTags.map(tag => (
          <InputGroup className="mb-3" key={tag.id}>
            <Form.Control
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              defaultValue={tag.label}
              onChange={e => updateTags(tag.id, e.target.value)}
            />
            <Button variant="outline-danger" id="button-addon2" onClick={() => deleteTags(tag.id)}>
              delete
            </Button>
          </InputGroup>
        ))}
      </Modal.Body>
    </Modal>
  )
}
