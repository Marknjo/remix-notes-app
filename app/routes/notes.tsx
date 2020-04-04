import {
  redirect,
  type ActionFunction,
  type LinksFunction,
} from '@remix-run/node'
import NewNote, { links as newNoteStyles } from '~/components/NewNote'
import type { INote } from '~/data/notes'
import { createNote } from '~/data/notes'

export default function NotesPage() {
  return (
    <main>
      <NewNote />
    </main>
  )
}

export const links: LinksFunction = () => [...newNoteStyles()]

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const newNote: Pick<INote, 'description' | 'title'> = Object.fromEntries(
    formData,
  ) as Pick<INote, 'description' | 'title'>

  // validation
  await createNote(newNote)

  return redirect('.')
}
