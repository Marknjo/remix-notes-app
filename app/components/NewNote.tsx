import type { LinksFunction } from '@remix-run/node'
import { Form, useNavigation } from '@remix-run/react'
import styles from './NewNote.css'

function NewNote() {
  const navigation = useNavigation()

  const isSubmitting = navigation.state === 'submitting'

  return (
    <Form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting || false}>
          {isSubmitting ? 'Adding Note...' : 'Add Note'}
        </button>
      </div>
    </Form>
  )
}

export default NewNote

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}
