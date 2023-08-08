import type { BaseParams } from '@/api/base-params'

export interface ITranslation {
  id: number
  text: string
  createdAt: string
  updatedAt: string
  locale: string
}

export type GetTranslationsRequest = BaseParams
