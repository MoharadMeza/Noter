import { NextResponse } from 'next/server'

import { ErrorMetadata, ErrorSeverity, ErrorType } from '@app-types/error'

export class AppError extends Error {
  constructor(
    message: string,
    public type: ErrorType,
    public severity: ErrorSeverity = 'MEDIUM',
    public statusCode: number = 500,
    public metadata: ErrorMetadata = {}
  ) {
    super(message)
    this.name = 'AppError'
  }

  // Add helper method to check severity
  isCritical(): boolean {
    return this.severity === 'CRITICAL'
  }

  isHigh(): boolean {
    return this.severity === 'HIGH'
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      type: this.type,
      severity: this.severity,
      statusCode: this.statusCode,
      metadata: this.metadata,
      stack: this.stack,
    }
  }
}

export function handleUnexpectedError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error
  }
  return new AppError('Unhandled error', 'UNKNOWN', 'CRITICAL', 500, { error })
}

export function handleApiError(error: unknown): NextResponse {
  const mappedError = handleUnexpectedError(error)
  const { message, name, statusCode, type } = mappedError

  console.error(mappedError)

  return NextResponse.json({ message, name, statusCode, type }, { status: mappedError.statusCode })
}
