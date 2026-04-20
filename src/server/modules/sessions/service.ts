'use server'

import { cookies } from 'next/headers'
import { cache } from 'react'
import { JWTPayload, SignJWT, jwtVerify } from 'jose'
import { timeUnits } from '@libs/utils/date'
import env from '@libs/utils/env'

const secretKey = env.SECRET_KEY
const key = new TextEncoder().encode(secretKey)

export const encrypt = async (payload: JWTPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}

export const decrypt = async (session: string | undefined = '') => {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch {
    console.error('Failed to verify session')
    return null
  }
}

export const createSession = async (userId: string) => {
  const expiresAt = new Date(Date.now() + timeUnits.hour * 10)

  // 2. Encrypt the session ID
  const session = await encrypt({ userId, expiresAt })

  // 3. Store the session in cookies for optimistic auth checks
  const cookie = await cookies()
  cookie.set('session', session, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    return { isAuthorized: false, userId: null }
  }

  return { isAuthorized: true, userId: session.userId as string }
})
