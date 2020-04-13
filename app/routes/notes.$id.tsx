import type { LinksFunction, LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import DeleteNoteForm from '~/components/DeleteNoteForm'
import type { INote } from '~/data/notes'
import { getNote } from '~/data/notes'
import noteStyles from '~/styles/note-detail.css'

export default function NotePage() {
  const note = useLoaderData<INote>()
  const noteId = note.id

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes"> &larr; All Notes</Link>
        </nav>
        <h1>{note.title}</h1>
      </header>
      <p id="note-details-content">{note.description}</p>

      <DeleteNoteForm id={noteId!} className="trash-icon-delete" />
    </main>
  )
}

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: noteStyles,
  },
]

export const loader: LoaderFunction = async ({ params }) => {
  const param = params
  const noteId = param.id
  if (!noteId) {
    throw new Response(null, {
      statusText: 'Could not fetch the note',
      status: 404,
    })
  }

  try {
    return await getNote(noteId)
  } catch (error) {
    throw error
  }
}
