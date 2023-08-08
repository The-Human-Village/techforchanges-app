import type { ServiceInstances } from '@/api/ServiceHelper'
import type { SearchService } from '@/api/services/search/searchService'
import type {
  GetSearchRequest,
  SearchResponse,
} from '@/api/services/search/searchTypes'

class SearchApi implements SearchService {
  constructor(private clientInstances: ServiceInstances) {}

  async getSearch(params: GetSearchRequest): Promise<SearchResponse> {
    const res = await this.clientInstances.search.call({
      axiosRequestType: 'GET',
      method: '',
      params: params,
    })
    return res.data
  }
}

export default SearchApi
