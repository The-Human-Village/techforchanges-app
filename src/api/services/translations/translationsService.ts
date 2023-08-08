import { services } from '@/api/ServiceHelper'
import TranslationsApi from '@/api/services/translations/translationsApi'
import type {
  GetTranslationsRequest,
  ITranslation,
} from '@/api/services/translations/translationsTypes'

export interface TranslationsService {
  getTranslations(
    params?: GetTranslationsRequest,
  ): Promise<Record<string, ITranslation>>
}

const translationsService = new TranslationsApi(services)

export default translationsService
