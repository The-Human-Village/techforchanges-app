import type { ResponseDto } from '@/api/base-params'
import { services } from '@/api/ServiceHelper'
import NewsApi from '@/api/services/news/newsApi'
import type {
  GetNewsRequest,
  GetSingleNewsRequest,
  News,
} from '@/api/services/news/newsTypes'

export interface NewsService {
  getNews(params: GetNewsRequest, page: number): Promise<ResponseDto>
  getSingleNews(params: GetSingleNewsRequest): Promise<News>
}

const newsService = new NewsApi(services)

export default newsService
