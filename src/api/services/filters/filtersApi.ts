import type { ServiceInstances } from '@/api/ServiceHelper'
import type { FiltersService } from '@/api/services/filters/filtersService'
import type {
  ApplyFiltersRequest,
  ApplyFiltersResponse,
  FiltersRequest,
  FiltersResponse,
  GetApplyFiltersRequest,
  GetFiltersRequest,
} from '@/api/services/filters/filtersTypes'

class FiltersApi implements FiltersService {
  constructor(private clientInstances: ServiceInstances) {}

  async getFilters(
    body: FiltersRequest,
    params: GetFiltersRequest,
  ): Promise<FiltersResponse> {
    const res = await this.clientInstances['get-filters'].call({
      axiosRequestType: 'POST',
      method: '',
      params: params,
      body,
    })
    return res.data
  }

  async applyFilters(
    body: ApplyFiltersRequest,
    params: GetApplyFiltersRequest,
  ): Promise<ApplyFiltersResponse> {
    const res = await this.clientInstances['apply-filters'].call({
      axiosRequestType: 'POST',
      method: '',
      params: params,
      body,
    })
    return res.data
  }
}

export default FiltersApi
