import service from '@/api/service'
import { objectsKeys } from '@/api/services/objects/objectsKeys'
import type {
  GetObjects,
  GetObjectsRequest,
} from '@/api/services/objects/objectsTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface ObjectsData {
  params?: GetObjectsRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      GetObjects,
      readonly ['getObjects', GetObjectsRequest]
    >,
    'queryKey' | 'queryFn'
  >
}

export function useGetObjects({ params, options }: ObjectsData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...objectsKeys.getObjects, params],
    async () => {
      const data = await service.objects.getObjects(params)
      return data
    },
    {
      ...options,
    },
  )
}
