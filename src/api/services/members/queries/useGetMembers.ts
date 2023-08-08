import service from '@/api/service'
import { membersKeys } from '@/api/services/members/membersKeys'
import type {
  GetMembersRequest,
  Member,
} from '@/api/services/members/membersTypes'
import { getNextPageParam } from '@/api/services/utils'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useInfiniteQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface MembersData {
  params?: GetMembersRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      Member[],
      readonly ['getMembers', GetMembersRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetMembers({ params }: MembersData) {
  const { locale } = useRouter()
  params.locale = locale
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  } = useInfiniteQuery(
    [...membersKeys.getMembers, params],
    async ({ pageParam = 0 }) =>
      await service.members.getMembers(params, pageParam),
    {
      getNextPageParam: getNextPageParam,
    },
  )

  const members = data?.pages.flatMap((page) => page.results) || []

  return {
    members,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isInitialLoading,
  }
}
