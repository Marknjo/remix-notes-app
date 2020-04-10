import type { LinksFunction } from '@remix-run/node'
import { Link, useParams } from '@remix-run/react'
import DeleteNoteForm from '~/components/DeleteNoteForm'
import noteStyles from '~/styles/note-detail.css'

export default function NotePage() {
  const param = useParams()

  const noteId = param.id

  if (!noteId) {
    throw new Response(null, {
      statusText: 'Could not fetch the note',
      status: 404,
    })
  }

  return (
    <main id="note-details">
      <header>
        <nav>
          <Link to="/notes"> &larr; All Notes</Link>
        </nav>
        <h1>NOTE TITLE</h1>
      </header>
      <p id="note-details-content">NOTE CONTENT</p>

      <DeleteNoteForm id={noteId} className="trash-icon-delete" />
    </main>
  )
}

export const links: LinksFunction = () => [
  {
    rel: 'stylesheet',
    href: noteStyles,
  },
]
