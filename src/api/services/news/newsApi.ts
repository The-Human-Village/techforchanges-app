import type { ResponseDto } from '@/api/base-params'
import type { ServiceInstances } from '@/api/ServiceHelper'
import type { NewsService } from '@/api/services/news/newsService'
import type {
  GetNewsRequest,
  GetSingleNewsRequest,
  News,
} from '@/api/services/news/newsTypes'

class NewsApi implements NewsService {
  constructor(private clientInstances: ServiceInstances) {}

  async getNews(params: GetNewsRequest, page: number): Promise<ResponseDto> {
    const res = await this.clientInstances['multiple-news'].call({
      axiosRequestType: 'GET',
      method: '',
      params: {
        ...params,
        pagination: {
          page: page,
        },
      },
    })

    return res.data
  }

  async getSingleNews(params: GetSingleNewsRequest): Promise<News> {
    const res = await this.clientInstances['multiple-news'].call({
      axiosRequestType: 'GET',
      method: '',
      params,
    })

    return res?.data?.results[0]
  }
}

export default NewsApi
