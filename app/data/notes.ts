import { json } from '@remix-run/node'
import { v4 as randomUUID } from 'uuid'

import fs from 'fs/promises'

export interface INote {
  id: string
  title: string
  description: string
  createdAt: string
}

export async function getStoredNotes(): Promise<Array<INote> | []> {
  try {
    const rawFileContent = await fs.readFile('notes.json', {
      encoding: 'utf-8',
    })
    const data = JSON.parse(rawFileContent)

    const storedNotes = data.notes ?? []
    return storedNotes
  } catch (error) {
    throw new Response(null, {
      status: 500,
      statusText: 'Could not load notes from the store',
    })
  }
}

export async function createNote(note: Pick<INote, 'description' | 'title'>) {
  try {
    const oldNotes = await getStoredNotes()

    const id = randomUUID()

    const newNote: Partial<INote> = note
    newNote.id = id
    newNote.createdAt = new Date(Date.now()).toISOString()

    const newNotes = [newNote, ...oldNotes]

    return fs.writeFile('notes.json', JSON.stringify({ notes: newNotes || [] }))
  } catch (error) {
    throw new Response(null, {
      status: 500,
      statusText: 'Could not add new note to the store',
    })
  }
}
