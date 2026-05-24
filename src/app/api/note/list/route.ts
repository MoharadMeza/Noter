import { NextRequest, NextResponse } from 'next/server'

import { getQueryParams } from '@server/db-utils'
import { getNotesByUserId } from '@server/modules/note/services'
import { verifySession } from '@server/modules/sessions/service'

import { AppError, handleApiError } from '@libs/utils/error'

// Get notes
export async function GET(req: NextRequest) {
  const params = getQueryParams(req.nextUrl.searchParams)
  try {
    const { userId } = await verifySession()

    const noteList = await getNotesByUserId(userId, params)

    if (!noteList) {
      throw new AppError('User notes not found', 'AUTH', 'HIGH', 401)
    }

    return NextResponse.json(noteList)
  } catch (error) {
    return handleApiError(error)
  }
}
