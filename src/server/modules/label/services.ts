'use server'

import prisma from '@config/prisma'

import { AppError } from '@libs/utils/error'
import { withServiceErrorHandler } from '@libs/utils/service-error-handler'

const getLabelsByUserIdBase = async (userId: number) => {
  return await prisma.label.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
  })
}

const createLabelBase = async (name: string, userId: number) => {
  return await prisma.label.create({
    data: { name, userId },
  })
}

const deleteLabelBase = async (id: number, userId: number) => {
  const label = await prisma.label.findFirst({ where: { id, userId } })

  if (!label) {
    throw new Error('Label not found or unauthorized')
  }

  const usageCount = await prisma.noteLabel.count({ where: { labelId: id } })

  if (usageCount > 0) {
    throw new AppError('Label is in use', 'VALIDATION', 'LOW', 409)
  }

  return await prisma.label.delete({ where: { id } })
}

export const getLabelsByUserId = withServiceErrorHandler(getLabelsByUserIdBase, {
  type: 'DATABASE',
  severity: 'MEDIUM',
  statusCode: 500,
  code: 'LABELS_FETCH_FAILED',
  message: 'Failed to fetch labels',
})

export const createLabel = withServiceErrorHandler(createLabelBase, {
  type: 'DATABASE',
  severity: 'HIGH',
  statusCode: 500,
  code: 'LABEL_CREATION_FAILED',
  message: 'Failed to create label',
})

export const deleteLabel = withServiceErrorHandler(deleteLabelBase, {
  type: 'DATABASE',
  severity: 'HIGH',
  statusCode: 500,
  code: 'LABEL_DELETE_FAILED',
  message: 'Failed to delete label',
})
