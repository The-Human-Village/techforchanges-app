import service from '@/api/service'
import { filtersKeys } from '@/api/services/filters/filtersKeys'
import type {
  ApplyFiltersRequest,
  ApplyFiltersResponse,
  GetApplyFiltersRequest,
} from '@/api/services/filters/filtersTypes'
import { useFilters } from '@/hooks'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface ApplyFiltersData {
  params?: GetApplyFiltersRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      ApplyFiltersResponse,
      readonly ['applyFilters', GetApplyFiltersRequest]
    >,
    'queryKey' | 'queryFn'
  >
}

export function useApplyFilters({ params, options }: ApplyFiltersData) {
  const {
    dimensionUIDs,
    cities,
    returnServices,
    returnNews,
    returnMissions,
    returnServiceProviders,
    returnMembers,
  } = useFilters()

  const body: ApplyFiltersRequest = {
    dimensionUIDs,
    cities,
    returnServices: Boolean(returnServices),
    returnNews: Boolean(returnNews),
    returnMissions: Boolean(returnMissions),
    returnServiceProviders: Boolean(returnServiceProviders),
    returnMembers: Boolean(returnMembers),
  }
  const { locale } = useRouter()
  params.locale = locale

  const query = useQuery(
    [...filtersKeys.applyFilters, params],
    async () => await service.filters.applyFilters(body, params),
    {
      ...options,
      enabled: dimensionUIDs?.length > 0 || cities.length > 0,
    },
  )
  // Call the hook whenever dimensionUIDs or cities change
  useEffect(() => {
    if (dimensionUIDs.length > 0 || cities.length > 0) {
      query.refetch()
    }
  }, [dimensionUIDs, cities, query])

  return query
}
