import { NextResponse } from 'next/server'

import { verifySession } from '@server/modules/sessions/service'
import { getUserById } from '@server/modules/user/services'

import { AppError, handleApiError } from '@libs/utils/error'
import { ignoreFields } from '@libs/utils/object'

import { UserObject } from '@app-types/user'

export async function GET() {
  try {
    const { userId } = await verifySession()

    console.log(userId)

    if (!userId) {
      throw new AppError('Authentication failed', 'AUTH', 'HIGH', 401)
    }

    const user = await getUserById(userId)

    if (!user) {
      throw new AppError('User not found', 'AUTH', 'HIGH', 401)
    }

    const reducedUser = ignoreFields<UserObject>(user, ['password'])

    return NextResponse.json(reducedUser)
  } catch (error) {
    return handleApiError(error)
  }
}
