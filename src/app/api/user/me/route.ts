import { NextResponse } from 'next/server'
import { UserObject } from '@app-types/api'
import { AppError } from '@libs/utils/error'
import { ignoreFields } from '@libs/utils/object'
import { verifySession } from '@server/modules/sessions/service'
import { getUserById } from '@server/modules/user/services'

export async function GET() {
  try {
    const { userId } = await verifySession()

    if (!userId) {
      throw new AppError('Authentication failed', 'AUTH', 'HIGH', 401)
    }

    const user = await getUserById(userId)

    if (!user) {
      throw new AppError('User not found', 'AUTH', 'HIGH', 401)
    }

    const reducedUser = ignoreFields<UserObject>(user, ['password'])

    return NextResponse.json(reducedUser)
  } catch (e) {
    if (e instanceof AppError) {
      throw e
    }

    return new AppError('Internal server error', 'UNKNOWN', 'CRITICAL', 500)
  }
}
