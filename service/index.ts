import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

const baseURL = 'http://service.dastshafa.ir/api/Product'
const config: AxiosRequestConfig = {
  baseURL,
}
const AxiosProductInstance: AxiosInstance = axios.create(config)
export { AxiosProductInstance }
