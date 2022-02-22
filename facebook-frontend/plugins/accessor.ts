import { Plugin } from '@nuxt/types'
import { initializeAxios, initializeCookie } from '@/utils/nuxt-instance'

const accessor: Plugin = ({ $axios, $cookies }) => {
  initializeAxios($axios)
  initializeCookie($cookies)
}

export default accessor
