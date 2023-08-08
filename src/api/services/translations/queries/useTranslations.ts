import service from '@/api/service'
import { translationsKeys } from '@/api/services/translations/translationsKeys'
import type {
  GetTranslationsRequest,
  ITranslation,
} from '@/api/services/translations/translationsTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface TranslationsData {
  params?: GetTranslationsRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      Record<string, ITranslation>,
      readonly ['getTranslations', GetTranslationsRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetTranslations({ params, options }: TranslationsData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...translationsKeys.getTranslations, params],
    () => fetchTranslationsData(params),
    {
      ...options,
    },
  )
}

export const fetchTranslationsData = async (params) => {
  params = {
    ...params,
    pagination: {
      ...params.pagination,
      pageSize: 200,
      withCount: false,
    },
  }
  return await service.translations.getTranslations(params)
}
