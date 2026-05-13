export type SortOrder = 'asc' | 'desc'

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

export interface ApiParams<T extends string = any> {
  page: number
  limit: number
  sortOrder: SortOrder
  sortBy: T
  labelId?: number
}
