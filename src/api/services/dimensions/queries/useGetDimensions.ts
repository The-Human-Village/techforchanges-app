import service from '@/api/service'
import { dimensionsKeys } from '@/api/services/dimensions/dimensionsKeys'
import type {
  Dimension,
  GetDimensionsRequest,
} from '@/api/services/dimensions/dimensionsTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'
interface DimensionsData {
  params?: GetDimensionsRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      Dimension[],
      readonly ['getDimensions', GetDimensionsRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetDimensions({ params, options }: DimensionsData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...dimensionsKeys.getDimensions, params],
    () => fetchDimensionsData(params),
    {
      ...options,
    },
  )
}

export const fetchDimensionsData = async (params) => {
  return await service.dimensions.getDimensions(params)
}
