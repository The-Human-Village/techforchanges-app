import type { BaseParams } from '@/api/base-params'

export interface ILocale {
  id: number
  code: string
  createdAt: string
  isDefault: boolean
  name: string
  updatedAt: string
  flag: {
    id: number
    name: string
    ext: string
    url: string
  }
}

export type GetLocalesRequest = BaseParams
