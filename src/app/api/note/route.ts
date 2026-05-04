import { NextRequest, NextResponse } from 'next/server'

import { createNote } from '@server/modules/note/services'
import { verifySession } from '@server/modules/sessions/service'

import { AppError, handleApiError } from '@libs/utils/error'

import { NoteFormData } from '@components/note/new-note/new-note.validation'

// Create note
export async function POST(req: NextRequest) {
  try {
    const body: NoteFormData = await req.json()

    if (!body.title || !body.content) {
      throw new AppError('Validation error', 'VALIDATION', 'MEDIUM', 406)
    }

    const { userId } = await verifySession()
    const createdNote = await createNote(
      { title: body.title, content: body.content, color: body.color },
      userId
    )

    if (createdNote) {
      return NextResponse.json(createdNote)
    }

    throw new AppError('Internal server error', 'UNKNOWN', 'CRITICAL', 500)
  } catch (error) {
    return handleApiError(error)
  }
}
