import service from '@/api/service'
import { missionKeys } from '@/api/services/mission/missionKeys'
import type {
  GetMissionsRequest,
  Mission,
} from '@/api/services/mission/missionTypes'
import { getNextPageParam } from '@/api/services/utils'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface MissionsData {
  params?: GetMissionsRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      Mission[],
      readonly ['getMissions', GetMissionsRequest]
    >,
    'queryKey' | 'queryFn'
  >
}

export function useGetMissions({ params }: MissionsData) {
  const { locale } = useRouter()
  params.locale = locale
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useInfiniteQuery(
    [...missionKeys.getMissions, params],
    async ({ pageParam = 0 }) =>
      await service.missions.getMissions(params, pageParam),
    {
      getNextPageParam: getNextPageParam,
    },
  )

  const missions = data?.pages.flatMap((page) => page.results) || []

  return {
    missions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  }
}
