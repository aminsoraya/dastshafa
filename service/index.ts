import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'

const baseURL = 'http://localhost:5056/api/Product'
const config: AxiosRequestConfig = {
  baseURL,
}
const AxiosProductInstance: AxiosInstance = axios.create(config)
export { AxiosProductInstance }
