import type {
  AxiosInstance,
  AxiosRequestConfig,
  Method,
  RawAxiosRequestHeaders,
  ResponseType,
} from 'axios'
import { removeTrailingSlash } from 'src/helpers/helpers'

import type { TokenObserver } from '@/api/TokenObserver'

export enum AxiosRequestType {
  GET = 'GET',
  POST = 'POST',
  DELETE = 'DELETE',
  PUT = 'PUT',
}

interface CallMethodParams {
  axiosRequestType: Method
  method?: string
  params?: object
  headers?: RawAxiosRequestHeaders
  body?: object
  responseType?: ResponseType
  omitAuthorization?: boolean
  additionalOptions?: AxiosRequestConfig
}

export default class ServiceClient implements TokenObserver {
  private url
  private token
  private axiosInstance: AxiosInstance

  constructor(url: string, token: string, axiosInstance: AxiosInstance) {
    this.url = removeTrailingSlash(url)
    this.token = token
    this.axiosInstance = axiosInstance
  }

  public setToken(JWTtoken: string) {
    this.token = JWTtoken
  }

  public removeToken() {
    this.token = ''
  }

  public cancel() {
    //
  }

  async call({
    axiosRequestType,
    method,
    params,
    headers,
    body,
    omitAuthorization,
    additionalOptions,
    responseType = 'json',
  }: CallMethodParams) {
    const options: AxiosRequestConfig = {
      ...additionalOptions,
      url: `${this.url}${method ? `/${method}/` : ''}`,
      method: axiosRequestType,
      responseType,
    }

    if (this.token && !omitAuthorization) {
      options.headers = {
        Authorization: `Bearer ${this.token}`,
      }
    }
    if (headers) {
      options.headers = {
        ...(options.headers as RawAxiosRequestHeaders),
        ...headers,
        Accept: 'application/json',
      }
    }

    options.data = body
    options.params = { ...params }
    return await this.axiosInstance(options)
  }
}
