import type { ServiceInstances } from '@/api/ServiceHelper'
import type { LanguagesService } from '@/api/services/languages/languagesService'
import type { GetLanguagesRequest } from '@/api/services/languages/languagesTypes'

class LanguagesApi implements LanguagesService {
  constructor(private clientInstances: ServiceInstances) {}

  async getLanguages(params: GetLanguagesRequest): Promise<any> {
    const res = await this.clientInstances.languages.call({
      axiosRequestType: 'GET',
      method: '',
      params,
    })

    return res.data.results
  }
}

export default LanguagesApi
