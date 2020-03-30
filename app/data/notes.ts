import { json } from '@remix-run/node'
import fs from 'fs/promises'

export interface INote {
  title: string
  description: string
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
    throw json({
      message: 'Could not load notes from the store',
      statusCode: 500,
    })
  }
}

export function createNotes(notes: INote) {
  return fs.writeFile('notes.json', JSON.stringify({ notes: notes || [] }))
}
