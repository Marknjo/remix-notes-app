import { Link } from '@remix-run/react'
import type { INote } from '~/data/notes'
import styles from './NoteList.css'
import ExternalLinkIcon from './ExternalLinkIcon'
import DeleteNoteForm from './DeleteNoteForm'

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
              {<DeleteNoteForm id={note.id} />}
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
