import type { ServiceInstances } from '@/api/ServiceHelper'
import type { ServiceProvidersService } from '@/api/services/service-provider/serviceProvidersService'
import type {
  GetServiceProviderRequest,
  ServiceProvider,
} from '@/api/services/service-provider/serviceProviderTypes'

class ServiceProvidersApi implements ServiceProvidersService {
  constructor(private clientInstances: ServiceInstances) {}

  async getServiceProvider(
    params: GetServiceProviderRequest,
  ): Promise<ServiceProvider> {
    const res = await this.clientInstances['service-providers'].call({
      axiosRequestType: 'GET',
      method: '',
      params,
    })

    return res?.data?.results[0]
  }
}

export default ServiceProvidersApi
