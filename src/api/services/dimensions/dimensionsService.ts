import { services } from '@/api/ServiceHelper'
import DimensionsApi from '@/api/services/dimensions/dimensionsApi'
import type {
  Dimension,
  GetDimensionRequest,
  GetDimensionsRequest,
} from '@/api/services/dimensions/dimensionsTypes'
export interface DimensionsService {
  getDimensions(params: GetDimensionsRequest): Promise<Dimension[]>
  getDimension(params: GetDimensionRequest): Promise<Dimension>
}

const dimensionsService = new DimensionsApi(services)

export default dimensionsService
