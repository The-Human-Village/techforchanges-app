import type { BaseParams } from '@/api/base-params'
import type { Member } from '@/api/services/members/membersTypes'
import type { Mission } from '@/api/services/mission/missionTypes'
import type { News } from '@/api/services/news/newsTypes'
import type { ServiceProvider } from '@/api/services/service-provider/serviceProviderTypes'
import type { Service } from '@/api/services/services-entity/servicesTypes'
import type { FilterType } from '@/types'

export type FiltersResponse = Record<string, FilterType[]>

export type GetFiltersRequest = BaseParams & {
  searchString?: string | string[]
}

export type FiltersRequest = {
  newsUIDs?: string[]
  missionUIDs?: string[]
  serviceUIDs?: string[]
  serviceProviderUIDs?: string[]
}

export type GetApplyFiltersRequest = BaseParams

export type ApplyFiltersRequest = {
  dimensionUIDs?: string[]
  cities?: string[]
  returnNews?: boolean
  returnMissions?: boolean
  returnServices?: boolean
  returnServiceProviders?: boolean
  returnMembers?: boolean
}

export const FiltersKeys = [
  'dimensionUIDs',
  'cities',
  'returnNews',
  'returnMissions',
  'returnServices',
  'returnServiceProviders',
]

export type ApplyFiltersResponse = {
  news?: News[]
  missions?: Mission[]
  services?: Service[]
  serviceProviders?: ServiceProvider[]
  members: Member[]
}
