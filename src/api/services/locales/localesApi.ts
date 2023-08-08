import type { ServiceInstances } from '@/api/ServiceHelper'
import type { LocalesService } from '@/api/services/locales/localesService'
import type { GetLocalesRequest } from '@/api/services/locales/localesTypes'

class LocalesApi implements LocalesService {
  constructor(private clientInstances: ServiceInstances) {}

  async getLocales(params: GetLocalesRequest): Promise<any> {
    const res = await this.clientInstances['i18n/locales'].call({
      axiosRequestType: 'GET',
      method: '',
      params,
    })
    return res?.data
  }
}

export default LocalesApi
