import service from '@/api/service'
import { filtersKeys } from '@/api/services/filters/filtersKeys'
import type {
  FiltersRequest,
  FiltersResponse,
  GetFiltersRequest,
} from '@/api/services/filters/filtersTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface FiltersData {
  body: FiltersRequest // Add a `body` property to the `FiltersData` interface
  params?: GetFiltersRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      FiltersResponse,
      readonly ['getFilters', GetFiltersRequest]
    >,
    'queryKey' | 'queryFn'
  >
}

export function useFiltersResults({ body, params = {}, options }: FiltersData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...filtersKeys.getFilters, params],
    async () => await service.filters.getFilters(body, params),
    {
      ...options,
    },
  )
}
