/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Mobile from '@/store/mobile'
import UserRegister from '@/store/users/register'
import UserProfile from '@/store/users/user'
import Auth from '@/store/auth'

let mobile: Mobile
let userRegister: UserRegister
let userProfile: UserProfile
let auth: Auth

const initializeStores = (store: Store<any>): void => {
  mobile = getModule(Mobile, store)
  userRegister = getModule(UserRegister, store)
  userProfile = getModule(UserProfile, store)
  auth = getModule(Auth, store)
}

export { initializeStores, mobile, userRegister, userProfile, auth }
