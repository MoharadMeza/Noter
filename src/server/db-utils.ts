import { ApiParams, SortOrder } from '@app-types/api'

export interface PaginationParams {
  page: number
  limit: number
  skip: number
  take: number
}

export interface FindManyArgs<T = any> {
  skip?: number
  take?: number
  where?: T
  orderBy?: Record<string, SortOrder> | Record<string, SortOrder>[]
  select?: Record<string, boolean>
  include?: Record<string, boolean | object>
}

export interface PrismaModel<T, W> {
  findMany(args: FindManyArgs<W>): Promise<T[]>
  count(args: { where?: W }): Promise<number>
}

export interface PaginatedData<T> {
  data: T[]
  total: number
  totalPages: number
  currentPage: number
  limit: number
}

export function generatePaginationByParams(
  pageNumber: number | string = 1,
  pageLimit: number | string = 10
): PaginationParams {
  const page = Math.max(1, parseInt(String(pageNumber)))
  const limit = Math.max(1, parseInt(String(pageLimit)))
  const skip = (page - 1) * limit

  return {
    page,
    limit,
    skip,
    take: limit,
  }
}

export function generateOrderBy(sortBy: string = 'id', sortOrder: SortOrder = 'desc') {
  return { [sortBy]: sortOrder }
}

export async function generatePaginatedData<T, W = unknown>(
  model: PrismaModel<T, W>,
  findManyArgs: FindManyArgs<W>,
  pagination: PaginationParams
): Promise<PaginatedData<T>> {
  const [data, total] = await Promise.all([
    model.findMany(findManyArgs),
    model.count({ where: findManyArgs.where }),
  ])

  const totalPages = Math.ceil(total / pagination.limit)

  return {
    data,
    total,
    totalPages,
    currentPage: pagination.page,
    limit: pagination.limit,
  }
}

export const getQueryParams = (searchParams: URLSearchParams): ApiParams => ({
  page: Number(searchParams.get('page')) || 1,
  limit: Number(searchParams.get('limit')) || 10,
  sortBy: searchParams.get('sortBy') || undefined,
  sortOrder: (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc',
  labelId: searchParams.get('labelId') ? Number(searchParams.get('labelId')) : undefined,
})
