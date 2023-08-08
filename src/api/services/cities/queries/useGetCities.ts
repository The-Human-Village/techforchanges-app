import service from '@/api/service'
import { citiesKeys } from '@/api/services/cities/citiesKeys'
import type { City, GetCitiesRequest } from '@/api/services/cities/citiesTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface CitiesData {
  params?: GetCitiesRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      City[],
      readonly ['getCities', GetCitiesRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetCities({ params, options }: CitiesData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...citiesKeys.getCities, params],
    async () => await service.cities.getCities(params),
    {
      ...options,
    },
  )
}
