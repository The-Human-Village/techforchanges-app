import type { BaseParams } from '@/api/base-params'

export interface City {
  id: number
  title: string
  uid: string
  geo_height: number
  geo_width: number
  createdAt: Date
  updatedAt: Date
}

export type GetCitiesRequest = BaseParams
