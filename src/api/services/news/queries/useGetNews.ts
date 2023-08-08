import service from '@/api/service'
import { newsKeys } from '@/api/services/news/newsKeys'
import type { GetNewsRequest, News } from '@/api/services/news/newsTypes'
import { getNextPageParam } from '@/api/services/utils'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface NewsData {
  params?: GetNewsRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      News[],
      readonly ['getNews', GetNewsRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetNews({ params }: NewsData) {
  const { locale } = useRouter()
  params.locale = locale
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useInfiniteQuery(
    [...newsKeys.getNews, params],
    async ({ pageParam = 0 }) => await service.news.getNews(params, pageParam),
    {
      getNextPageParam: getNextPageParam,
    },
  )

  const news = data?.pages.flatMap((page) => page.results) || []

  return {
    news,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  }
}
