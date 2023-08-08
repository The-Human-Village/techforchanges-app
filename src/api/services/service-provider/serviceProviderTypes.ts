import type { BaseParams } from '@/api/base-params'
import type { City } from '@/api/services/cities/citiesTypes'
import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
import type { Language } from '@/api/services/languages/languagesTypes'
import type { ServiceProviderContact } from '@/api/services/service-provider-contacts/serviceProviderContactsTypes'
export interface ServiceProvider {
  locale_uid: string
  title: string
  email: string
  website_url: string
  uid: string
  description: string
  telephone_number: string
  contacts: ServiceProviderContact[]
  header_image: any
  createdAt: string
  available: boolean
  city: City
  dimensions: Dimension[]
  languages: Language[]
  service_provider: ServiceProvider
  logo: {
    url: string
  }
}

export type GetServiceProviderRequest = BaseParams & {
  filters?: { locale_uid: string }
}
