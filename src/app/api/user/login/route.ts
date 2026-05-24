import { LoginFormData } from '@libs/components/authentication/login/login'
import { AppError } from '@libs/utils/error'
import { login } from '@server/modules/user/services'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body: LoginFormData = await req.json()
    if (body.email && body.password) {
      const user = await login(body)

      if (user) {
        return Response.json({ message: `${user.username} is logged in` })
      }
    }

    throw new AppError('Login credential is invalid', 'AUTH', 'HIGH', 401)
  } catch (e) {
    if (e instanceof AppError) {
      return NextResponse.json(e.toJSON(), { status: e.statusCode })
    }

    return new AppError('Internal server error', 'UNKNOWN', 'CRITICAL', 500)
  }
}
