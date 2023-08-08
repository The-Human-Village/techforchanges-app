import type { ResponseDto } from '@/api/base-params'
import { services } from '@/api/ServiceHelper'
import MissionApi from '@/api/services/mission/missionApi'
import type {
  GetMissionRequest,
  GetMissionsRequest,
  Mission,
} from '@/api/services/mission/missionTypes'

export interface MissionService {
  getMissions(params: GetMissionsRequest, page: number): Promise<ResponseDto>
  getMission(params: GetMissionRequest): Promise<Mission>
}

const missionService = new MissionApi(services)

export default missionService
