'use server'

import {
  FindManyArgs,
  generateOrderBy,
  generatePaginatedData,
  generatePaginationByParams,
} from '@server/db-utils'

import { Prisma } from '@db-models'

import prisma from '@config/prisma'

import { withServiceErrorHandler } from '@libs/utils/service-error-handler'

import { ApiParams } from '@app-types/api'
import { NoteObject } from '@app-types/note'

const createNoteBase = async (
  body: { title: string; content: string; color: string },
  userId: number
) => {
  return await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
      color: body.color,
      userId,
    },
  })
}

const getNotesByUserIdBase = async (userId: number, params: ApiParams<keyof NoteObject>) => {
  const pagination = generatePaginationByParams(params.page, params.limit)
  const filters: FindManyArgs = {
    skip: pagination.skip,
    take: pagination.take,
    where: { userId },
    orderBy: generateOrderBy(params.sortBy, params.sortOrder),
  }

  const result = await generatePaginatedData<Prisma.NoteGetPayload<object>, Prisma.NoteWhereInput>(
    prisma.note,
    filters,
    pagination
  )

  return result
}

const getNoteByIdBase = async (id: number) => {
  return await prisma.note.findUnique({
    where: { id, isDeleted: false },
  })
}

const updateNoteBase = async (
  id: number,
  body: { title: string; content: string; color: string }
) => {
  return await prisma.note.update({
    where: { id },
    data: {
      ...body,
    },
  })
}

const deleteNoteBase = async (id: number, userId: number) => {
  const note = await getNoteByIdBase(id)

  if (!note || note.userId !== userId) {
    throw new Error('Note not found or unauthorized')
  }

  return await prisma.note.delete({
    where: { id },
  })
}

const getMyNoteBase = async (id: number, userId: number) => {
  return await prisma.note.findFirst({
    where: {
      id,
      userId,
    },
  })
}

const getMyNotesBase = async (userId: number) => {
  return await prisma.note.findMany({
    where: {
      userId,
    },
  })
}

export const createNote = withServiceErrorHandler(createNoteBase, {
  type: 'DATABASE',
  severity: 'CRITICAL',
  statusCode: 500,
  code: 'NOTE_CREATION_FAILED',
  message: 'Failed to create note',
})

export const getNotesByUserId = withServiceErrorHandler(getNotesByUserIdBase, {
  type: 'DATABASE',
  severity: 'MEDIUM',
  statusCode: 500,
  code: 'NOTES_FETCH_FAILED',
  message: 'Failed to fetch user notes',
})

export const getNoteById = withServiceErrorHandler(getNoteByIdBase, {
  type: 'DATABASE',
  severity: 'MEDIUM',
  statusCode: 500,
  code: 'NOTE_FETCH_FAILED',
  message: 'Failed to fetch note',
})

export const updateNote = withServiceErrorHandler(updateNoteBase, {
  type: 'DATABASE',
  severity: 'HIGH',
  statusCode: 500,
  code: 'NOTE_UPDATE_FAILED',
  message: 'Failed to update note',
})

export const deleteNote = withServiceErrorHandler(deleteNoteBase, {
  type: 'DATABASE',
  severity: 'HIGH',
  statusCode: 500,
  code: 'NOTE_DELETE_FAILED',
  message: 'Failed to delete note',
})

export const getMyNote = withServiceErrorHandler(getMyNoteBase, {
  type: 'DATABASE',
  severity: 'MEDIUM',
  statusCode: 500,
  code: 'NOTE_FETCH_FAILED',
  message: 'Failed to fetch note',
})

export const getMyNotes = withServiceErrorHandler(getMyNotesBase, {
  type: 'DATABASE',
  severity: 'MEDIUM',
  statusCode: 500,
  code: 'NOTES_FETCH_FAILED',
  message: 'Failed to fetch notes',
})
