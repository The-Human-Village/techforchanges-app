import type { BaseParams } from '@/api/base-params'
import type { Service } from '@/api/services/services-entity/servicesTypes'
export interface AltIconAttributes {
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: string
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string
  provider: string
  provider_metadata: string
  createdAt: Date
  updatedAt: Date
}

export interface Attribute {
  locale_uid: string
  title: string
  is_active: string
  createdAt: Date
  updatedAt: Date
  locale: string
  description: string
  services: Service[]
  alt_icon: {
    data: {
      attributes: AltIconAttributes
    }
  }
  icon: {
    data: {
      attributes: AltIconAttributes
    }
  }
}
export interface Dimension {
  title: string
  services: Service[]
  locale_uid: string
  alt_icon: {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: string
    hash: string
    ext: string
    mime: string
    size: number
    url: string
  }
  icon: {
    name: string
    alternativeText: string
    caption: string
    width: number
    height: number
    formats: string
    hash: string
    ext: string
    mime: string
    size: number
    url: string
  }
  attributes: Attribute
}

export type GetDimensionsRequest =
  | BaseParams
  | {
      locale: string
      filters?: {
        dimension_parent?: {
          id: {
            $null: boolean
          }
        }
      }
    }

export type GetDimensionRequest =
  | BaseParams & {
      locale?: string
      filters?: {
        dimension_parent?: {
          id: {
            $null: boolean
          }
        }
      }
    }
