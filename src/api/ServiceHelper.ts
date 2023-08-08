import { AxiosInstance } from '@/api/axios'
import ServiceClient from '@/api/ServiceClient'
import type { AxiosRequestConfig } from 'axios'

export function createURLFromSlug(curr: string) {
  return `${process.env.NEXT_PUBLIC_API_URL}/${curr}`
}

export const serviceNames = [
  'languages',
  'dimensions',
  'cities',
  'members',
  'services',
  'multiple-news',
  'missions',
  'translations',
  'i18n/locales',
  'service-providers',
  'search',
  'get-filters',
  'apply-filters',
  'get-objects',
] as const

type ArrayToObject<Arr extends ReadonlyArray<string> = []> = {
  [K in Arr[number]]: ServiceClient
}

export type ServiceInstances = ArrayToObject<typeof serviceNames>
export type ServiceName = (typeof serviceNames)[number]

export type SendFn = (cl: AxiosRequestConfig) => Promise<unknown>

export const services = serviceNames.reduce(
  (prev, curr) => ({
    ...prev,
    [curr]: new ServiceClient(createURLFromSlug(curr), '', AxiosInstance),
  }),
  {} as ServiceInstances,
)

export const UPLOAD_TIMEOUT_MS = 5 * 60 * 1000
