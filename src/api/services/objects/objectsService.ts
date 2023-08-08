import { services } from '@/api/ServiceHelper'
import ObjectsApi from '@/api/services/objects/objectsApi'
import type { GetObjects, GetObjectsRequest } from './objectsTypes'

export interface ObjectsService {
  getObjects(params: GetObjectsRequest): Promise<GetObjects>
}

const objectsService = new ObjectsApi(services)

export default objectsService
