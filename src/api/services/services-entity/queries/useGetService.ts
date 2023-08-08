import service from '@/api/service'
import { servicesKeys } from '@/api/services/services-entity/servicesKeys'
import type {
  GetServiceRequest,
  Service,
} from '@/api/services/services-entity/servicesTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface ServiceData {
  params?: GetServiceRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      Service,
      readonly ['getService', GetServiceRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetService({ params, options }: ServiceData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...servicesKeys.getService, params],
    async () => await service.services.getService(params),
    {
      ...options,
    },
  )
}
