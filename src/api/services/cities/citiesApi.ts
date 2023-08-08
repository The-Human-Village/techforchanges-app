import type { ServiceInstances } from '@/api/ServiceHelper'
import type { CitiesService } from '@/api/services/cities/citiesService'
import type { City, GetCitiesRequest } from '@/api/services/cities/citiesTypes'

class CitiesApi implements CitiesService {
  constructor(private clientInstances: ServiceInstances) {}

  async getCities(params: GetCitiesRequest): Promise<City[]> {
    const res = await this.clientInstances.cities.call({
      axiosRequestType: 'GET',
      method: '',
      params: { params },
    })

    return res.data.results
  }
}

export default CitiesApi
