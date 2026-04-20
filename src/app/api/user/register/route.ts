import { RegisterFormData } from '@libs/components/authentication/register/register'
import { AppError } from '@libs/utils/error'
import { register } from '@server/modules/user/services'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body: RegisterFormData = await req.json()
    if (body.email && body.password) {
      const user = await register(body)

      if (user) {
        return Response.json({ message: `${user.username} is registered` })
      }
    }

    throw new AppError('Login credential is invalid', 'AUTH', 'HIGH', 401)
  } catch (e) {
    if (e instanceof AppError) {
      return NextResponse.error()
    }

    return new AppError('Internal server error', 'UNKNOWN', 'CRITICAL', 500)
  }
}
