export type ErrorType =
  | 'AUTH'
  | 'VALIDATION'
  | 'DATABASE'
  | 'SERVER'
  | 'NETWORK'
  | 'PERMISSION'
  | 'NOT_FOUND'
  | 'CONFLICT'
  | 'RATE_LIMIT'
  | 'UNKNOWN'

export type ErrorMetadata = Record<string, string | unknown>
export type ErrorSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
