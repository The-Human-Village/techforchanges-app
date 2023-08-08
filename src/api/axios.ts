import type { AxiosError, AxiosResponse } from 'axios'
import axios from 'axios'

export const AxiosInstance = axios.create()

AxiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const { response } = error

    const rq = {
      url: response.config.url,
      params: response.config.params,
      method: response.config.method,
      data:
        typeof response.config.data === 'string'
          ? JSON.parse(response.config.data)
          : response.config.data,
    }

    return await axios.request(rq)
  },
)
