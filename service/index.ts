import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

const baseURL = '/api'
const config: AxiosRequestConfig = {
  baseURL,
}
const AxiosProductInstance: AxiosInstance = axios.create(config)
export { AxiosProductInstance }
