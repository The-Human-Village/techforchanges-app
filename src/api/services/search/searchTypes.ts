import type { BaseParams } from '@/api/base-params'
import type { Member } from '@/api/services/members/membersTypes'
import type { Mission } from '@/api/services/mission/missionTypes'
import type { News } from '@/api/services/news/newsTypes'
import type { ServiceProvider } from '@/api/services/service-provider/serviceProviderTypes'
import type { Service } from '@/api/services/services-entity/servicesTypes'

export type SearchResponse = {
  members?: Member[]
  missions?: Mission[]
  news?: News[]
  serviceProviders?: ServiceProvider[]
  services?: Service[]
}

export type GetSearchRequest = BaseParams & { searchString?: string | string[] }
