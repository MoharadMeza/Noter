import { NextRequest, NextResponse } from 'next/server'

import { deleteLabel } from '@server/modules/label/services'
import { verifySession } from '@server/modules/sessions/service'

import { AppError, handleApiError } from '@libs/utils/error'

// Delete label
export async function DELETE(req: NextRequest, context: RouteContext<'/api/label/[id]'>) {
  try {
    const { id: labelId } = await context.params

    if (!labelId) {
      throw new AppError('Validation error', 'VALIDATION', 'MEDIUM', 406)
    }

    const { userId } = await verifySession()
    const deletedLabel = await deleteLabel(Number(labelId), userId)

    if (deletedLabel) {
      return NextResponse.json(deletedLabel)
    }

    throw new AppError('Internal server error', 'UNKNOWN', 'CRITICAL', 500)
  } catch (error) {
    return handleApiError(error)
  }
}
