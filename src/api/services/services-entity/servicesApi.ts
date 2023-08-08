import type { ResponseDto } from '@/api/base-params'
import type { ServiceInstances } from '@/api/ServiceHelper'
import type { ServicesService } from '@/api/services/services-entity/servicesService'
import type {
  GetServiceRequest,
  GetServicesRequest,
  Service,
} from '@/api/services/services-entity/servicesTypes'

class ServicesApi implements ServicesService {
  constructor(private clientInstances: ServiceInstances) {}

  async getServices(
    params: GetServicesRequest,
    page: number,
  ): Promise<ResponseDto> {
    const res = await this.clientInstances.services.call({
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

  async getService(params: GetServiceRequest): Promise<Service> {
    const res = await this.clientInstances.services.call({
      axiosRequestType: 'GET',
      method: '',
      params: {
        ...params,
      },
    })

    return res?.data?.results[0]
  }
}

export default ServicesApi
