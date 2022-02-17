import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Mobile from '@/store/mobile'
import UserRegister from '@/store/users/register'

// eslint-disable-next-line import/no-mutable-exports
let mobile: Mobile
// eslint-disable-next-line import/no-mutable-exports
let userRegister: UserRegister

const initializeStores = (store: Store<any>): void => {
  mobile = getModule(Mobile, store)
  userRegister = getModule(UserRegister, store)
}

export { initializeStores, mobile, userRegister }
