import service from '@/api/service'

import type { GetServiceRequest } from '@/api/services/services-entity/servicesTypes'

import { serviceProvidersKeys } from '@/api/services/service-provider/serviceProvidersKeys'
import type { ServiceProvider } from '@/api/services/service-provider/serviceProviderTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface ServiceProviderData {
  params?: GetServiceRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      ServiceProvider,
      readonly ['getServiceProvider', GetServiceRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetServiceProvider({
  params,
  options,
}: ServiceProviderData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...serviceProvidersKeys.getServiceProvider, params],
    async () => await service.serviceProviders.getServiceProvider(params),
    {
      ...options,
    },
  )
}
