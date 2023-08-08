import type { BaseParams } from '@/api/base-params'
import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
export interface Mission {
  title?: string
  uid?: string
  locale_uid: string
  is_active?: boolean
  description?: string
  publishedAt?: string
  main_text?: string
  preview_text?: string
  dimensions?: Dimension[]
  createdAt?: Date
  reviewer?: Reviewer
  header_image?: {
    url: string
  }
}

export interface Reviewer {
  id: number
  first_name: string
  last_name: string
  email: string
}

export type GetMissionsRequest = BaseParams & {
  filters?: { dimensions: { id: { $in: string[] | number[] } } }
}

export type GetMissionRequest = BaseParams & {
  filters?: { locale_uid: string }
}
