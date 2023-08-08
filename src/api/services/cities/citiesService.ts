import { services } from '@/api/ServiceHelper'
import CitiesApi from '@/api/services/cities/citiesApi'
import type { City, GetCitiesRequest } from '@/api/services/cities/citiesTypes'

export interface CitiesService {
  getCities(params?: GetCitiesRequest): Promise<City[]>
}

const citiesService = new CitiesApi(services)

export default citiesService
