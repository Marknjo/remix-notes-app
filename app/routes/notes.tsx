import { redirect } from '@remix-run/node'
import type {
  LoaderFunction,
  ActionFunction,
  LinksFunction,
} from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { TErrors } from '~/components/NewNote'
import NewNote, { links as newNoteStyles } from '~/components/NewNote'
import NoteList, { links as noteListStyles } from '~/components/NoteList'
import type { INote } from '~/data/notes'
import { createNote, getStoredNotes } from '~/data/notes'

export const loader: LoaderFunction = async () => {
  return getStoredNotes()
}

export default function NotesPage() {
  const notes = useLoaderData<Array<INote> | []>()

  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  )
}

export const links: LinksFunction = () => [
  ...newNoteStyles(),
  ...noteListStyles(),
]

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const newNote: Pick<INote, 'description' | 'title'> = Object.fromEntries(
    formData,
  ) as Pick<INote, 'description' | 'title'>

  // validation
  const errors = {
    required: {
      type: 'required',
      title: newNote.title ? null : 'Title is required',
      description: newNote.description ? null : 'Description is required',
    },
    minLen: {
      type: 'minLen',
      title: newNote.title.length > 5 ? null : 'Title is too short',
      description:
        newNote.description.length > 5 ? null : 'Description is too short',
    },
    maxLen: {
      type: 'maxLen',
      title: newNote.title.length < 100 ? null : 'Title is too long',
      description:
        newNote.description.length < 1000 ? null : 'Description is too long',
    },
  }

  const hasErrors = Object.values(Object.values(errors)).some(
    errorMes => errorMes.title || errorMes.description,
  )

  if (hasErrors) {
    return {
      errors: Object.values(errors) as TErrors,
      values: {
        title: newNote.title,
        description: newNote.description,
      },
    }
  }

  // save to store
  await createNote(newNote)

  return redirect('.')
}
