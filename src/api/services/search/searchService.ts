import { services } from '@/api/ServiceHelper'
import SearchApi from '@/api/services/search/searchApi'
import type {
  GetSearchRequest,
  SearchResponse,
} from '@/api/services/search/searchTypes'

export interface SearchService {
  getSearch(params?: GetSearchRequest): Promise<SearchResponse>
}

const searchService = new SearchApi(services)

export default searchService
