import type { ServiceInstances } from '@/api/ServiceHelper'
import type { TranslationsService } from '@/api/services/translations/translationsService'
import type {
  GetTranslationsRequest,
  ITranslation,
} from '@/api/services/translations/translationsTypes'

class TranslationsApi implements TranslationsService {
  constructor(private clientInstances: ServiceInstances) {}

  async getTranslations(
    params: GetTranslationsRequest,
  ): Promise<Record<string, ITranslation>> {
    const res = await this.clientInstances.translations.call({
      axiosRequestType: 'GET',
      method: '',
      params,
    })

    return res.data.data
  }
}

export default TranslationsApi
