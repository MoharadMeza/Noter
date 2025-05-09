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
