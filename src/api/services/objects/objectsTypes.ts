import type { BaseParams } from '@/api/base-params'
import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
import type { Mission } from '@/api/services/mission/missionTypes'
import type { News } from '@/api/services/news/newsTypes'
import type { Service } from '@/api/services/services-entity/servicesTypes'
export interface GetObjects {
  dimensions: Dimension[]
  services: Service[]
  missions: Mission[]
  news: News[]
}
export type GetObjectsRequest = BaseParams & {
  UIDs: string[]
}
