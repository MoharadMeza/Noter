import { PrismaClient } from '@prisma/client'

import { withServiceErrorHandler } from '@libs/utils/service-error-handler'

const prisma = new PrismaClient()

export const createNote = withServiceErrorHandler(
  async (title: string, content: string, userId: number) => {
    return await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    })
  },
  {
    type: 'DATABASE',
    severity: 'HIGH',
    statusCode: 500,
    code: 'NOTE_CREATION_FAILED',
    message: 'Failed to create note',
  }
)

export const getNoteById = withServiceErrorHandler(
  async (id: number) => {
    return await prisma.note.findUnique({
      where: { id },
    })
  },
  {
    type: 'DATABASE',
    severity: 'MEDIUM',
    statusCode: 500,
    code: 'NOTE_FETCH_FAILED',
    message: 'Failed to fetch note',
  }
)

export const updateNote = withServiceErrorHandler(
  async (id: number, title: string, content: string) => {
    return await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    })
  },
  {
    type: 'DATABASE',
    severity: 'HIGH',
    statusCode: 500,
    code: 'NOTE_UPDATE_FAILED',
    message: 'Failed to update note',
  }
)

export const deleteNote = withServiceErrorHandler(
  async (id: number) => {
    return await prisma.note.delete({
      where: { id },
    })
  },
  {
    type: 'DATABASE',
    severity: 'HIGH',
    statusCode: 500,
    code: 'NOTE_DELETE_FAILED',
    message: 'Failed to delete note',
  }
)

export const getMyNote = withServiceErrorHandler(
  async (id: number, userId: number) => {
    return await prisma.note.findFirst({
      where: {
        id,
        userId,
      },
    })
  },
  {
    type: 'DATABASE',
    severity: 'MEDIUM',
    statusCode: 500,
    code: 'NOTE_FETCH_FAILED',
    message: 'Failed to fetch note',
  }
)

export const getMyNotes = withServiceErrorHandler(
  async (userId: number) => {
    return await prisma.note.findMany({
      where: {
        userId,
      },
    })
  },
  {
    type: 'DATABASE',
    severity: 'MEDIUM',
    statusCode: 500,
    code: 'NOTES_FETCH_FAILED',
    message: 'Failed to fetch notes',
  }
)
