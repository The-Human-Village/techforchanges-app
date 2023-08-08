import service from '@/api/service'
import { languagesKeys } from '@/api/services/languages/languagesKeys'
import type {
  GetLanguagesRequest,
  Language,
} from '@/api/services/languages/languagesTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface LanguageData {
  params?: GetLanguagesRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      Language[],
      readonly ['getLanguages', GetLanguagesRequest]
    >,
    'queryKey' | 'queryFn'
  >
}

export function useGetLanguages({ params, options }: LanguageData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...languagesKeys.getLanguages, params],
    async () => {
      return await service.languages.getLanguages(params)
    },
    {
      ...options,
    },
  )
}
