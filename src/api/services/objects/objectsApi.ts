import type { ServiceInstances } from '@/api/ServiceHelper'
import type { ObjectsService } from './objectsService'
import type { GetObjects, GetObjectsRequest } from './objectsTypes'

class ObjectsApi implements ObjectsService {
  constructor(private clientInstances: ServiceInstances) {}

  async getObjects(params: GetObjectsRequest): Promise<GetObjects> {
    const uids = params.UIDs
    const res = await this.clientInstances['get-objects'].call({
      axiosRequestType: 'POST',
      method: '',
      params,
      body: {
        UIDs: uids,
      },
    })

    return res.data
  }
}

export default ObjectsApi
