export type BaseParams = {
  populate?: string
  locale?: string
  sort?: string
  pagination?: {
    pageSize?: number
    page?: number
    withCount?: boolean
    start?: number
  }
}

export type Pagination = {
  total: number
  page: number
  pageCount: number
  pageSize: number
}

export type ResponseDto = {
  pagination: Pagination
  results: []
}
