import service from '@/api/service'
import { dimensionsKeys } from '@/api/services/dimensions/dimensionsKeys'
import type {
  Dimension,
  GetDimensionRequest,
} from '@/api/services/dimensions/dimensionsTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface DimensionData {
  params?: GetDimensionRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      Dimension,
      readonly ['getDimension', GetDimensionRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetDimension({ params, options }: DimensionData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...dimensionsKeys.getDimension, params],
    async () => await service.dimensions.getDimension(params),
    {
      ...options,
    },
  )
}
