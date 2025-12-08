import axios, { AxiosError, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios'

interface Options {
  requestInterceptor: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig
  responseInterceptor: (error: AxiosError) => Promise<AxiosResponse>
}

export const createAxiosManager = (defaults: CreateAxiosDefaults, options?: Partial<Options>) => {
  const api = axios.create(defaults)

  if (options?.requestInterceptor) {
    api.interceptors.request.use(options.requestInterceptor)
  }

  if (options?.responseInterceptor) {
    api.interceptors.response.use((res) => res, options.responseInterceptor)
  }

  return api
}

export * from './spotify'
