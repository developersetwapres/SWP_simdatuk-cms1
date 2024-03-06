import axios from 'axios'
import { Logger } from './logger'
import { getStorage } from './storage'

/**
 * 
 * Log Responser
 * 
 * @param {*} res 
 * @returns
 */
export const logResponser = (res) => {
  if (!res) return null
  const { config } = res
  const loadTime = performance.now()
  const url = config.url.replace(process.env.NEXT_PUBLIC_API_URL, '')

  // * Send Response to logger 
  Logger(`${config.method.toUpperCase()} ${url}`, {
    responseTime: loadTime,
    status: res.status,
    statusText: res.statusText,
    error: res?.data?.meta?.error || '',
    message: res?.data?.meta?.message || ''
  })
}

// * Default Headers

/**
 * Axios create default config
 */
const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost',
  headers: {
    Authorization: {
      toString() {
        // return `Bearer ${getClientSideCookie('_setneg_token')}`
        return `Bearer ${getStorage('setneg_token')}`
      }
    },
    version: process.env.APP_VERSION || 'v1.0.0'
  }
})

/**
 * Axios interceptors
 */
service.interceptors.response.use(function (res) {
  // * Turn on logger when not in production
  if (process.env.NODE_ENV !== 'production')
    logResponser(res)
  return res
}, function (error) {
  const store = window.__REDUX_STORE__
  if (error.response.status === 401) {
    store.dispatch({
      type: 'ACTION_RESPONSER', payload: {
        code: error.response.status || 401,
        message: 'Sesion anda telah habis, silahkan login kembali'
      }
    })
  }
  // else if (error.response.status === 403) {
  //   store.dispatch({
  //     type: 'ACTION_RESPONSER', payload: {
  //       code: error.response.status || 403,
  //       message: 'Mohon maaf, anda tidak diizinkan untuk mengakses halaman ini',
  //       redirect: '/profile'
  //     }
  //   })
  // } else if (error.response.status === 400) {
  //   store.dispatch({
  //     type: 'ACTION_RESPONSER', payload: {
  //       code: 400,
  //       message: 'Mohon Maaf kami sedang dalam gangguan',
  //       redirect: '/profile'
  //     }
  //   })
  // } else if (error.message === 'Network Error' || error.response.status === 500) {
  //   store.dispatch({
  //     type: 'ACTION_RESPONSER',
  //     payload: {
  //       code: 500,
  //       message: 'Mohon Maaf kami sedang dalam gangguan',
  //       redirect: '/profile'
  //     }
  //   })
  // }

  const err = error?.response
  // * Turn on logger when not in production
  if (process.env.NODE_ENV !== 'production')
    logResponser(err)


  return Promise.reject(err)
})

/**
 *
 * Function Get Axios
 *
 * @param {String} url
 * @param {*} params
 */
export const get = (url, params) => {
  return service.get(`${url}`, {
    params
  })
}

/**
 *
 * Function Post Axios
 *
 * @param {String} url
 * @param {*} body
 */
export const post = (url, body) => {
  return service.post(`${url}`, body)
}

/**
 *
 * Function Put Axios
 *
 * @param {String} url
 * @param {*} body
 */
export const put = (url, body) => {
  return service.put(`${url}`, body)
}

/**
 * 
 * Function Patch Axios 
 * 
 * @param {String} url 
 * @param {*} body
 */
export const patch = (url, body) => {
  return service.patch(`${url}`, body)
}

/**
 *
 * Function Delete Axios
 *
 * @param {String} url
 * @param {*} params
 */
export const del = (url, params) => {
  return service.delete(`${url}`, {
    params
  })
}

/**
 *
 * Custom Function getBlob response
 *
 * @param {String} url
 * @param {*} params
 */
export const getBlob = (url, params) => {
  return service.get(`${url}`, {
    params,
    responseType: 'blob'
  })
}