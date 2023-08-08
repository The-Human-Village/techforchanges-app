import type { ServiceInstances } from '@/api/ServiceHelper'
import type { DimensionsService } from '@/api/services/dimensions/dimensionsService'
import type {
  Dimension,
  GetDimensionRequest,
  GetDimensionsRequest,
} from '@/api/services/dimensions/dimensionsTypes'

class DimensionsApi implements DimensionsService {
  constructor(private clientInstances: ServiceInstances) {}

  async getDimensions(params: GetDimensionsRequest): Promise<Dimension[]> {
    const res = await this.clientInstances.dimensions.call({
      axiosRequestType: 'GET',
      method: '',
      params,
      omitAuthorization: true,
    })
    return res.data.data
  }

  async getDimension(params: GetDimensionRequest): Promise<Dimension> {
    const res = await this.clientInstances.dimensions.call({
      axiosRequestType: 'GET',
      method: '',
      params,
      omitAuthorization: true,
    })
    return res.data.data
  }
}

export default DimensionsApi
