import React, { FormEvent, useMemo, useRef, useState } from 'react'
import { Col, Form, Row, Stack, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import CreateableReactSelect from 'react-select/creatable'
import { v4 as uuid4 } from 'uuid';

interface NoteFormProps extends Partial<NoteData> {
  onSubmit: (data: NoteData, id?: string) => void
  addTags: (tag: Tag) => void
  availableTags: Tag[]
}
function NoteForm({ onSubmit, addTags, availableTags, title="", markdown="", tags=[] }: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markDownRef = useRef<HTMLTextAreaElement>(null)
  const [AllTags, setTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markDownRef.current!.value,
      tags: AllTags
    })
    navigate('..')
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row className='text-xl'>
          <Col>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={titleRef} defaultValue={title}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='tags'>
              <Form.Label>tags</Form.Label>
              <CreateableReactSelect
                onCreateOption={label => {
                  const newTag = { id: uuid4(), label }
                  setTags(preState => ([...preState, newTag]))
                  addTags(newTag)
                }}
                isMulti
                options={availableTags.map(tag => ({
                  label: tag.label,
                  value: tag.label,
                }))}
                required
                value={AllTags.map(tag => ({
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
        <Form.Group controlId='markdown' className='text-xl'>
          <Form.Label>body</Form.Label>
          <Form.Control defaultValue={markdown} required as={'textarea'} ref={markDownRef} className="h-[200px] resize-none"></Form.Control>
        </Form.Group>
        <Stack direction='horizontal' gap={2} className="justify-end">
          <Button variant='primary' type='submit'>save</Button>
          <Link to="..">
            <Button variant='outline-secondary' type='button'>cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NoteForm