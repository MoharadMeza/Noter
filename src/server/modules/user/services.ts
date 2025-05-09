'use server'

import * as jose from 'jose'

import { UserObject } from '@app-types/api'
import prisma from '@config/prisma'
import { createSession } from '@server/modules/sessions/service'

import env from '@libs/utils/env'
import { AppError } from '@libs/utils/error'

// Utility functions
const secretKey = new TextEncoder().encode(env.SECRET_KEY)
const algorithm = 'HS256'

async function hashPassword(password: string): Promise<string> {
  try {
    const jwt = await new jose.SignJWT({ password })
      .setProtectedHeader({ alg: algorithm })
      .setIssuedAt()
      .setExpirationTime('1y')
      .sign(secretKey)

    return jwt
  } catch (error) {
    throw new AppError('Failed to hash password', 'SERVER', 'HIGH', 500, {
      code: 'PASSWORD_HASH_FAILED',
      originalError: error,
    })
  }
}

async function verifyPassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
  try {
    const { payload } = await jose.jwtVerify(hashedPassword, secretKey)
    return payload.password === plainPassword
  } catch {
    return false
  }
}

// Main exported functions
export async function login(props: { email: string; password: string }): Promise<UserObject> {
  const { email, password } = props

  try {
    // Find user
    const user = await findUserByEmail(email)
    if (!user) {
      throw new AppError('Invalid email or password', 'AUTH', 'MEDIUM', 401, {
        code: 'INVALID_CREDENTIALS',
      })
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      throw new AppError('Invalid email or password', 'AUTH', 'MEDIUM', 401, {
        code: 'INVALID_CREDENTIALS',
      })
    }

    // Create session
    await createSession(user.id.toString())

    return user
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError('Login failed', 'SERVER', 'HIGH', 500, {
      code: 'LOGIN_FAILED',
      originalError: error,
    })
  }
}

export async function register(props: {
  username: string
  email: string
  password: string
}): Promise<UserObject> {
  const { username, email, password } = props

  try {
    // Check if user exists
    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      throw new AppError('Email already exists', 'CONFLICT', 'MEDIUM', 409, { code: 'USER_EXISTS' })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    })

    // Create session after successful registration
    await createSession(user.id.toString())

    return user
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError('Registration failed', 'SERVER', 'HIGH', 500, {
      code: 'REGISTRATION_FAILED',
      originalError: error,
    })
  }
}

// Helper functions
async function findUserByEmail(email: string): Promise<UserObject | null> {
  return prisma.user.findFirst({
    where: {
      email,
    },
  })
}

export async function getAllUsers(): Promise<UserObject[]> {
  try {
    return await prisma.user.findMany()
  } catch (error) {
    throw new AppError('Failed to fetch users', 'DATABASE', 'HIGH', 500, {
      code: 'FETCH_USERS_FAILED',
      originalError: error,
    })
  }
}

export async function getUserById(id: string): Promise<UserObject | null> {
  try {
    return await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    })
  } catch (error) {
    throw new AppError('Failed to fetch user', 'DATABASE', 'HIGH', 500, {
      code: 'FETCH_USER_FAILED',
      originalError: error,
    })
  }
}

export async function updateUser(id: string, data: Partial<UserObject>): Promise<UserObject> {
  try {
    // If password is being updated, hash it
    if (data.password) {
      data.password = await hashPassword(data.password)
    }

    return await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data,
    })
  } catch (error) {
    throw new AppError('Failed to update user', 'DATABASE', 'HIGH', 500, {
      code: 'UPDATE_USER_FAILED',
      originalError: error,
    })
  }
}

export async function deleteUser(id: string): Promise<UserObject> {
  try {
    return await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    })
  } catch (error) {
    throw new AppError('Failed to delete user', 'DATABASE', 'HIGH', 500, {
      code: 'DELETE_USER_FAILED',
      originalError: error,
    })
  }
}

export async function validateUserCredentials(email: string, password: string): Promise<boolean> {
  try {
    const user = await findUserByEmail(email)
    if (!user) return false

    return verifyPassword(password, user.password)
  } catch (error) {
    throw new AppError('Failed to validate credentials', 'AUTH', 'MEDIUM', 401, {
      code: 'VALIDATION_FAILED',
      originalError: error,
    })
  }
}

export async function changePassword(
  userId: string,
  oldPassword: string,
  newPassword: string
): Promise<boolean> {
  try {
    const user = await getUserById(userId)
    if (!user) {
      throw new AppError('User not found', 'NOT_FOUND', 'LOW', 404, { code: 'USER_NOT_FOUND' })
    }

    const isValidOldPassword = await verifyPassword(oldPassword, user.password)
    if (!isValidOldPassword) {
      throw new AppError('Invalid old password', 'AUTH', 'MEDIUM', 401, {
        code: 'INVALID_OLD_PASSWORD',
      })
    }

    const hashedNewPassword = await hashPassword(newPassword)
    await prisma.user.update({
      where: { id: parseInt(userId) },
      data: { password: hashedNewPassword },
    })

    return true
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError('Failed to change password', 'SERVER', 'HIGH', 500, {
      code: 'PASSWORD_CHANGE_FAILED',
      originalError: error,
    })
  }
}
