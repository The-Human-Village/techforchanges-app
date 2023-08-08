import type { Language } from '@/api/services/languages/languagesTypes'

export interface ServiceProviderContact {
  id: number
  attributes: {
    first_name: string
    last_name: string
    uid: string
    telephone_number: string
    email: string
    image: {
      data: {
        attributes: {
          id: number
          url: string
          formats: {
            thumbnail: {
              url: string
            }
          }
        }
      }
    }
    languages: {
      data: { attributes: Language }[]
    }
  }
}
