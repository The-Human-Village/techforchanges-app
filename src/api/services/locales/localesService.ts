import { services } from '@/api/ServiceHelper'
import LocalesApi from '@/api/services/locales/localesApi'
import type {
  GetLocalesRequest,
  ILocale,
} from '@/api/services/locales/localesTypes'

export interface LocalesService {
  getLocales(params: GetLocalesRequest): Promise<ILocale[]>
}

const localesService = new LocalesApi(services)

export default localesService
