import { services } from '@/api/ServiceHelper'
import LanguagesApi from '@/api/services/languages/languagesApi'
import type {
  GetLanguagesRequest,
  Language,
} from '@/api/services/languages/languagesTypes'

export interface LanguagesService {
  getLanguages(params: GetLanguagesRequest): Promise<Language[]>
}

const languagesService = new LanguagesApi(services)

export default languagesService
