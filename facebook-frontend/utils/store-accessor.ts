import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Mobile from '@/store/mobile'
import UserRegister from '@/store/users/register'
import Auth from '@/store/auth'

// eslint-disable-next-line import/no-mutable-exports
let mobile: Mobile
// eslint-disable-next-line import/no-mutable-exports
let userRegister: UserRegister
// eslint-disable-next-line import/no-mutable-exports
let auth: Auth

const initializeStores = (store: Store<any>): void => {
  mobile = getModule(Mobile, store)
  userRegister = getModule(UserRegister, store)
  auth = getModule(Auth, store)
}

export { initializeStores, mobile, userRegister, auth }
