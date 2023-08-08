import service from '@/api/service'
import { localesKeys } from '@/api/services/locales/localesKeys'
import type {
  GetLocalesRequest,
  ILocale,
} from '@/api/services/locales/localesTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface LocalesData {
  params?: GetLocalesRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      ILocale[],
      readonly ['getLocales', GetLocalesRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetLocales({ params, options }: LocalesData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...localesKeys.getLocales, params],
    () => fetchLocalesData(params),
    {
      ...options,
    },
  )
}

export const fetchLocalesData = async (params) => {
  return await service.locales.getLocales(params)
}
