import type { BaseParams } from '@/api/base-params'

export interface Language {
  name: string
  abbreviation: string
  createdAt: Date
  title: string
  uid: string
  updatedAt: Date
  icon: {
    name: string
    url: string
    data: {
      attributes: {
        name: string
        url: string
      }
    }
  }
}

export type GetLanguagesRequest = BaseParams & {
  populate: string
}
