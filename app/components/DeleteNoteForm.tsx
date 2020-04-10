import { Form } from '@remix-run/react'
import TrashIcon from './TrashIcon'

export default function DeleteNoteForm({
  id,
  className,
}: {
  id: string
  className?: string
}) {
  return (
    <Form action="/delete-note" method="delete">
      <input type="hidden" name="noteId" value={id} aria-hidden />
      <button
        type="submit"
        className={`delete-btn ${className ? className : ''}`}
      >
        <TrashIcon />
      </button>
    </Form>
  )
}
