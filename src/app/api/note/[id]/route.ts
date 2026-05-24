import { NextRequest, NextResponse } from 'next/server'

import { deleteNote, updateNote } from '@server/modules/note/services'
import { verifySession } from '@server/modules/sessions/service'

import { AppError, handleApiError } from '@libs/utils/error'

import { NoteFormData } from '@components/note/new-note/new-note.validation'

// Delete note
export async function DELETE(req: NextRequest, context: RouteContext<'/api/note/[id]'>) {
  try {
    const { id: noteId } = await context.params

    if (!noteId) {
      throw new AppError('Validation error', 'VALIDATION', 'MEDIUM', 406)
    }

    const { userId } = await verifySession()
    const deletedNote = await deleteNote(Number(noteId), userId)

    if (deletedNote) {
      return NextResponse.json(deletedNote)
    }

    throw new AppError('Internal server error', 'UNKNOWN', 'CRITICAL', 500)
  } catch (error) {
    return handleApiError(error)
  }
}

// Update note
export async function PATCH(req: NextRequest, context: RouteContext<'/api/note/[id]'>) {
  try {
    const { id: noteId } = await context.params
    const body: NoteFormData = await req.json()

    if (!body.content) {
      throw new AppError('Validation error', 'VALIDATION', 'MEDIUM', 406)
    }

    if (!noteId) {
      throw new AppError('Validation error', 'VALIDATION', 'MEDIUM', 406)
    }

    const { userId } = await verifySession()

    const updatedNote = await updateNote(
      Number(noteId),
      {
        title: body.title,
        content: body.content,
        color: body.color,
        labelIds: body.labelIds,
      },
      userId
    )

    if (updatedNote) {
      return NextResponse.json(updatedNote)
    }

    throw new AppError('Internal server error', 'UNKNOWN', 'CRITICAL', 500)
  } catch (error) {
    return handleApiError(error)
  }
}
