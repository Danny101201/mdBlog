type RawNote = {
  id: string
  title: string
  markdown: string
  tagsIds: string[]
}
type NoteData = {
  title: string
  markdown: string
  tags: Tag[]
}
type Tag = {
  id: string
  label: string
}

interface NoteWithTags {
  title: string;
  markdown: string;
  id: string;
  tagsIds: string[];
  tags: Tag[];
}
