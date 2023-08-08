import { services } from '@/api/ServiceHelper'
import FiltersApi from '@/api/services/filters/filtersApi'
import type {
  ApplyFiltersRequest,
  ApplyFiltersResponse,
  FiltersRequest,
  FiltersResponse,
  GetApplyFiltersRequest,
  GetFiltersRequest,
} from '@/api/services/filters/filtersTypes'

export interface FiltersService {
  getFilters(
    body: FiltersRequest,
    params?: GetFiltersRequest,
  ): Promise<FiltersResponse>
  applyFilters(
    body: ApplyFiltersRequest,
    params?: GetApplyFiltersRequest,
  ): Promise<ApplyFiltersResponse>
}

const filtersService = new FiltersApi(services)

export default filtersService
