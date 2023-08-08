import type { BaseParams } from '@/api/base-params'
import type { Mission } from '@/api/services/mission/missionTypes'

export type News = Mission

export type GetNewsRequest = BaseParams & {
  filters?: { dimensions: { id: { $in: number[] | string[] } } }
}

export type GetSingleNewsRequest = BaseParams & {
  filters?: {
    locale_uid: string
    dimensions?: { id: { $in: number[] | string[] } }
  }
}
