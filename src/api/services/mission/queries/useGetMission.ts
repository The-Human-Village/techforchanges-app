import service from '@/api/service'
import { missionKeys } from '@/api/services/mission/missionKeys'
import type {
  GetMissionRequest,
  Mission,
} from '@/api/services/mission/missionTypes'
import type { UseQueryOptions } from '@tanstack/react-query'
import { useQuery } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next/router'

interface MissionData {
  params?: GetMissionRequest
  options?: Omit<
    UseQueryOptions<
      unknown,
      AxiosError,
      Mission,
      readonly ['getMission', GetMissionRequest]
    >,
    'queryKey' | 'queryFn'
  >
}
export function useGetMission({ params, options }: MissionData) {
  const { locale } = useRouter()
  params.locale = locale
  return useQuery(
    [...missionKeys.getMission, params],
    async () => await service.missions.getMission(params),
    {
      ...options,
    },
  )
}
