import service from '@/api/service'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { newsKeys } from '../newsKeys'
import type { GetSingleNewsRequest, News } from '../newsTypes'

interface NewsData {
  params?: GetSingleNewsRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      News,
      readonly ['getSingleNews', GetSingleNewsRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetSingleNews({ params, options }: NewsData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...newsKeys.getSingleNews, params],
    async () => await service.news.getSingleNews(params),
    {
      ...options,
    },
  )
}
