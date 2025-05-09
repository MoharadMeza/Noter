import { User } from '@prisma/client'

export interface SuccessResponseApi<T> {
  result: {
    data: undefined | T
    success: boolean
    total?: number
    totalPages?: number
    currentPage?: number
  }
  http: {
    status: number | null
  }
}

export interface ErrorResponseApi extends Error {
  result: ErrorObject
  http: {
    status: number | null
  }
}

export interface ErrorObject {
  message: string
  code: string
  errors: Record<string, string>[]
}

export interface UserObject extends User {}
