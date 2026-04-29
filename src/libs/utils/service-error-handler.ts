import { AppError } from '@libs/utils/error'

import { ErrorType, ErrorSeverity } from '@app-types/error'

type ServiceFunction<T, Args extends unknown[]> = (...args: Args) => Promise<T>

interface ServiceErrorOptions {
  type?: ErrorType
  severity?: ErrorSeverity
  statusCode?: number
  code?: string
  message?: string
}

export function withServiceErrorHandler<T, Args extends unknown[]>(
  fn: ServiceFunction<T, Args>,
  options: ServiceErrorOptions = {}
) {
  return async (...args: Args): Promise<T> => {
    try {
      return await fn(...args)
    } catch (error) {
      // If it's already an AppError, rethrow it
      if (error instanceof AppError) {
        throw error
      }

      // Handle Prisma errors
      if (error instanceof Error && error.name === 'PrismaClientKnownRequestError') {
        throw new AppError(
          options.message || 'Database operation failed',
          options.type || 'DATABASE',
          options.severity || 'HIGH',
          options.statusCode || 500,
          {
            code: options.code || 'DATABASE_ERROR',
            originalError: error,
          }
        )
      }

      // Handle validation errors
      if (error instanceof Error && error.name === 'ValidationError') {
        throw new AppError(
          options.message || error.message,
          options.type || 'VALIDATION',
          options.severity || 'MEDIUM',
          options.statusCode || 400,
          {
            code: options.code || 'VALIDATION_ERROR',
            originalError: error,
          }
        )
      }

      // Handle unknown errors
      throw new AppError(
        options.message || 'An unexpected error occurred',
        options.type || 'UNKNOWN',
        options.severity || 'HIGH',
        options.statusCode || 500,
        {
          code: options.code || 'UNKNOWN_ERROR',
          originalError: error,
        }
      )
    }
  }
}

// Example usage:
/*
export const createUser = withServiceErrorHandler(
  async (data: CreateUserData) => {
    return await prisma.user.create({ data })
  },
  {
    type: 'DATABASE',
    severity: 'HIGH',
    statusCode: 500,
    code: 'USER_CREATION_FAILED',
    message: 'Failed to create user'
  }
)
*/
