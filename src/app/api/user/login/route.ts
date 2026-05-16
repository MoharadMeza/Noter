import { NextRequest, NextResponse } from 'next/server'

import { login } from '@server/modules/user/services'

import { LoginFormData } from '@libs/components/authentication/login/login'
import { AppError, handleApiError } from '@libs/utils/error'

export async function POST(req: NextRequest) {
  try {
    const body: LoginFormData = await req.json()
    if (body.email && body.password) {
      const user = await login(body)

      if (user) {
        return NextResponse.json(user)
      }
    }

    throw new AppError('Login credential is invalid', 'AUTH', 'HIGH', 401)
  } catch (error) {
    return handleApiError(error)
  }
}
