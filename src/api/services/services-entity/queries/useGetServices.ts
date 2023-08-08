import service from '@/api/service'
import { getNextPageParam } from '@/api/services//utils'
import { servicesKeys } from '@/api/services/services-entity/servicesKeys'
import type {
  GetServicesRequest,
  Service,
} from '@/api/services/services-entity/servicesTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface ServicesData {
  params?: GetServicesRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      Service[],
      readonly ['getServices', GetServicesRequest]
    >,
    'queryKey' | 'queryFn'
  >
}

export function useGetServices({ params }: ServicesData) {
  const { locale } = useRouter()
  params.locale = locale
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useInfiniteQuery(
    [...servicesKeys.getServices, params],
    async ({ pageParam = 0 }) =>
      await service.services.getServices(params, pageParam),
    {
      getNextPageParam: getNextPageParam,
    },
  )

  const services = data?.pages.flatMap((page) => page.results) || []

  return {
    services,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  }
}
