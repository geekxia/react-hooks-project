import axios from './axios'

export function fetchQqMusic(params) {
  return axios({
    url: '/soso/fcgi-bin/client_search_cp',
    method: 'GET',
    params
  })
}

export function fetchWeather(params) {
  return axios({
    url: '/jisuapi/weather',
    method: 'GET',
    params
  })
}

export default {
  fetchQqMusic,
  fetchWeather
}
