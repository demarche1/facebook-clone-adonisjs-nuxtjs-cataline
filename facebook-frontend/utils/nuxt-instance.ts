import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { NuxtCookies } from 'cookie-universal-nuxt'

/* eslint-disable import/no-mutable-exports */
let $axios: NuxtAxiosInstance
let $cookies: NuxtCookies

export const initializeAxios = (axiosInstance: NuxtAxiosInstance) => {
  $axios = axiosInstance
}

export const initializeCookie = (cookieInstance: NuxtCookies) => {
  $cookies = cookieInstance
}

export { $axios, $cookies }
