import type { ResponseDto } from '@/api/base-params'
import { services } from '@/api/ServiceHelper'
import MembersApi from '@/api/services/members/membersApi'
import type { GetMembersRequest } from '@/api/services/members/membersTypes'

export interface MembersService {
  getMembers(params: GetMembersRequest, page: number): Promise<ResponseDto>
}

const membersService = new MembersApi(services)

export default membersService
