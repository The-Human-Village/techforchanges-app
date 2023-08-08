import type { ResponseDto } from '@/api/base-params'
import { services } from '@/api/ServiceHelper'
import ServicesApi from '@/api/services/services-entity/servicesApi'
import type {
  GetServiceRequest,
  GetServicesRequest,
  Service,
} from '@/api/services/services-entity/servicesTypes'

export interface ServicesService {
  getServices(params: GetServicesRequest, page: number): Promise<ResponseDto>
  getService(params: GetServiceRequest): Promise<Service>
}

const servicesService = new ServicesApi(services)

export default servicesService
