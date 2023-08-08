import type { BaseParams } from '@/api/base-params'
import type { City } from '@/api/services/cities/citiesTypes'
import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
import type { ServiceProvider } from '@/api/services/service-provider/serviceProviderTypes'

export type Language = {
  name: string
  key: string
  icon: string
}
export interface Service {
  locale_uid: string
  bookmark: boolean
  title: string
  uid: string
  description: string
  available: boolean
  city: City
  dimensions: Dimension[]
  createdAt: string
  languages: Language[]
  header_image: {
    url: string
  }
  icon: {
    url: string
  }
  service_provider: ServiceProvider
  website_url: string
}

export type GetServicesRequest = BaseParams & {
  filters?: { dimensions: { id: { $in: string[] | number[] } } }
}

export type GetServiceRequest = BaseParams & {
  filters?: { locale_uid: string }
}
