import service from '@/api/service'
import { searchKeys } from '@/api/services/search/searchKeys'
import type {
  GetSearchRequest,
  SearchResponse,
} from '@/api/services/search/searchTypes'
import { useSearchStore } from '@/store/search'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface SearchData {
  params?: GetSearchRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      SearchResponse,
      readonly ['getSearch', GetSearchRequest]
    >,
    'queryKey' | 'queryFn'
  >
}

export function useSearchResults({ params, options }: SearchData) {
  const { searchTerm } = useSearchStore((state) => state)
  const { locale } = useRouter()
  params.locale = locale

  const extendedParams: GetSearchRequest = {
    ...params,
    searchString: searchTerm,
  }

  return useQuery(
    [...searchKeys.getSearch, extendedParams],
    async () => await service.search.getSearch(extendedParams),
    {
      ...options,
      enabled: !!searchTerm,
    },
  )
}
