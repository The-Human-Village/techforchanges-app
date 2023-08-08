import type { ResponseDto } from '@/api/base-params'
import type { ServiceInstances } from '@/api/ServiceHelper'
import type { MembersService } from '@/api/services/members/membersService'
import type { GetMembersRequest } from '@/api/services/members/membersTypes'

class MembersApi implements MembersService {
  constructor(private clientInstances: ServiceInstances) {}

  async getMembers(
    params: GetMembersRequest,
    page: number,
  ): Promise<ResponseDto> {
    const res = await this.clientInstances.members.call({
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
}

export default MembersApi
