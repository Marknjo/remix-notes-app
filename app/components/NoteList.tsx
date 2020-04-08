import type { INote } from '~/data/notes'
import styles from './NoteList.css'
import TrashIcon from './TrashIcon'
import { Form, Link } from '@remix-run/react'
import ExternalLinkIcon from './ExternalLinkIcon'

function NoteList({ notes }: { notes: Array<INote> }) {
  return (
    <ul id="note-list">
      {notes.map((note, index) => (
        <li key={note.id} className="note">
          <article>
            <header>
              <Link to={`./${note.id}`} className="link-to-note">
                <ExternalLinkIcon />
              </Link>
              <ul className="note-meta">
                <li>#{index + 1}</li>
                <li>
                  <time dateTime={note.id}>
                    {new Date(note.createdAt).toLocaleDateString('en-US', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </time>
                </li>
              </ul>
              <h2>{note.title}</h2>
              <Form action="/delete-note" method="delete">
                <input
                  type="hidden"
                  name="noteId"
                  value={note.id}
                  aria-hidden
                />
                <button type="submit" className="delete-btn">
                  <TrashIcon />
                </button>
              </Form>
            </header>
            <p>{note.description}</p>
          </article>
        </li>
      ))}
    </ul>
  )
}

export default NoteList

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}
