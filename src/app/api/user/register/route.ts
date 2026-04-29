import { NextRequest, NextResponse } from 'next/server'

import { register } from '@server/modules/user/services'

import { RegisterFormData } from '@libs/components/authentication/register/register'
import { AppError, handleApiError } from '@libs/utils/error'

export async function POST(req: NextRequest) {
  try {
    const body: RegisterFormData = await req.json()
    if (body.email && body.password) {
      const user = await register(body)

      if (user) {
        return NextResponse.json({ message: `${user.username} is registered` })
      }
    }

    throw new AppError('Login credential is invalid', 'AUTH', 'HIGH', 401)
  } catch (error) {
    return handleApiError(error)
  }
}
