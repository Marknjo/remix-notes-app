import { redirect, type ActionFunction } from '@remix-run/node'
import { deleteNote } from '~/data/notes'

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const data = Object.fromEntries(formData) as { noteId: string }

  try {
    await deleteNote(data.noteId)
  } catch (error) {
    throw error
  }

  return redirect('/notes')
}
