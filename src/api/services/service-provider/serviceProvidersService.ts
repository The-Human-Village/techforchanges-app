import { services } from '@/api/ServiceHelper'

import ServiceProvidersApi from '@/api/services/service-provider/serviceProvidersApi'
import type {
  GetServiceProviderRequest,
  ServiceProvider,
} from '@/api/services/service-provider/serviceProviderTypes'

export interface ServiceProvidersService {
  getServiceProvider(
    params: GetServiceProviderRequest,
  ): Promise<ServiceProvider>
}

const serviceProvidersService = new ServiceProvidersApi(services)

export default serviceProvidersService
