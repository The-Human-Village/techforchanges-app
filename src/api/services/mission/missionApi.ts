import type { ResponseDto } from '@/api/base-params'
import type { ServiceInstances } from '@/api/ServiceHelper'
import type { MissionService } from '@/api/services/mission/missionService'
import type {
  GetMissionRequest,
  GetMissionsRequest,
  Mission,
} from '@/api/services/mission/missionTypes'

class MissionsApi implements MissionService {
  constructor(private clientInstances: ServiceInstances) {}

  async getMissions(
    params: GetMissionsRequest,
    page: number,
  ): Promise<ResponseDto> {
    const res = await this.clientInstances.missions.call({
      axiosRequestType: 'GET',
      method: '',
      params: {
        ...params,
        pagination: {
          page: page,
        },
      },
    })

    return res.data
  }

  async getMission(params: GetMissionRequest): Promise<Mission> {
    const res = await this.clientInstances.missions.call({
      axiosRequestType: 'GET',
      method: '',
      params: {
        ...params,
      },
    })

    return res?.data?.results[0]
  }
}

export default MissionsApi
