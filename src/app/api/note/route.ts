import { NoteFormData } from '@libs/components/note/new-note/new-note.validation'
import { AppError, handleApiError } from '@libs/utils/error'
import { createNote } from '@server/modules/note/services'
import { verifySession } from '@server/modules/sessions/service'
import { NextRequest, NextResponse } from 'next/server'

// Create note
export async function POST(req: NextRequest) {
  try {
    const body: NoteFormData = await req.json()

    if (!body.title || !body.content) {
      throw new AppError('Validation error', 'VALIDATION', 'MEDIUM', 406)
    }

    const { userId } = await verifySession()
    const createdNote = await createNote(body.title, body.title, userId)

    if (createdNote) {
      return NextResponse.json(createdNote)
    }

    throw new AppError('Internal server error', 'UNKNOWN', 'CRITICAL', 500)
  } catch (error) {
    return handleApiError(error)
  }
}
