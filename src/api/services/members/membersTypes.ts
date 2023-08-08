import type { BaseParams } from '@/api/base-params'
import type { City } from '@/api/services/cities/citiesTypes'
import type { Dimension } from '@/api/services/dimensions/dimensionsTypes'
import type { Language } from '@/api/services/languages/languagesTypes'
export interface Member {
  id: number
  first_name: string
  last_name: string
  sign_up_name: string
  verified: boolean
  telephone_number: string
  email: string
  uid: string
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
  city: City
  dimensions: Dimension[]
  languages: Language[]
  image: {
    id: number
    url: string
    formats: {
      thumbnail: {
        url: string
      }
    }
  }
}

export type GetMembersRequest = BaseParams & {
  verified: true
  filters?: {
    languages?: {
      abbreviation: {
        $in: string[]
      }
    }
    city?: {
      id: {
        $eq: number
      }
    }
    dimensions?: {
      id: {
        $in: number[] | string[]
      }
    }
  }
}
