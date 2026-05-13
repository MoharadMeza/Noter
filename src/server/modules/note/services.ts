'use server'

import {
  FindManyArgs,
  PrismaModel,
  generateOrderBy,
  generatePaginatedData,
  generatePaginationByParams,
} from '@server/db-utils'

import { Prisma } from '@db-models'

import prisma from '@config/prisma'

import { withServiceErrorHandler } from '@libs/utils/service-error-handler'

import { NoteFormData } from '@components/note/new-note/new-note.validation'

import { ApiParams } from '@app-types/api'
import { NoteObject } from '@app-types/note'

const noteWithLabelsInclude = {
  Labels: {
    include: { Label: true },
  },
} as const

type NoteWithLabels = Prisma.NoteGetPayload<{ include: typeof noteWithLabelsInclude }>

const mapNoteLabels = (note: NoteWithLabels): NoteObject => {
  const { Labels, color, ...rest } = note

  return {
    ...rest,
    color: color as NoteObject['color'],
    labels: Labels?.map((nl) => nl.Label) ?? [],
  }
}

const createNoteBase = async (body: NoteFormData, userId: number) => {
  const note = await prisma.note.create({
    data: {
      title: body.title,
      content: body.content,
      color: body.color,
      userId,
    },
    include: noteWithLabelsInclude,
  })

  if (body.labelIds && body.labelIds.length > 0) {
    await prisma.noteLabel.createMany({
      data: body.labelIds.map((labelId) => ({ noteId: note.id, labelId })),
    })

    const noteWithLabels = await prisma.note.findUnique({
      where: { id: note.id },
      include: noteWithLabelsInclude,
    })

    return mapNoteLabels(noteWithLabels!)
  }

  return mapNoteLabels(note)
}

const getNotesByUserIdBase = async (userId: number, params: ApiParams<keyof NoteObject>) => {
  const pagination = generatePaginationByParams(params.page, params.limit)

  const where: Prisma.NoteWhereInput = { userId }

  if (params.labelId) {
    where.Labels = { some: { labelId: params.labelId } }
  }

  const filters: FindManyArgs = {
    skip: pagination.skip,
    take: pagination.take,
    where,
    orderBy: generateOrderBy(params.sortBy, params.sortOrder),
    include: noteWithLabelsInclude,
  }

  const result = await generatePaginatedData<NoteWithLabels, Prisma.NoteWhereInput>(
    prisma.note as unknown as PrismaModel<NoteWithLabels, Prisma.NoteWhereInput>,
    filters,
    pagination
  )

  return {
    ...result,
    data: result.data.map(mapNoteLabels),
  }
}

const getNoteByIdBase = async (id: number) => {
  const note = await prisma.note.findUnique({
    where: { id, isDeleted: false },
    include: noteWithLabelsInclude,
  })

  return note ? mapNoteLabels(note) : null
}

const updateNoteBase = async (id: number, body: NoteFormData, userId: number) => {
  await prisma.note.update({
    where: { id },
    data: {
      title: body.title,
      content: body.content,
      color: body.color,
    },
  })

  if (body.labelIds !== undefined) {
    await prisma.noteLabel.deleteMany({ where: { noteId: id } })

    if (body.labelIds.length > 0) {
      const validLabels = await prisma.label.findMany({
        where: { id: { in: body.labelIds }, userId },
        select: { id: true },
      })

      const validIds = validLabels.map((l) => l.id)

      if (validIds.length > 0) {
        await prisma.noteLabel.createMany({
          data: validIds.map((labelId) => ({ noteId: id, labelId })),
        })
      }
    }
  }

  const updatedNote = await prisma.note.findUnique({
    where: { id },
    include: noteWithLabelsInclude,
  })

  return mapNoteLabels(updatedNote!)
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
