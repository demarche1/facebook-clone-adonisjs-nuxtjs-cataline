/* eslint-disable import/no-mutable-exports */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import Mobile from '@/store/mobile'
import UserRegister from '@/store/users/register'
import UserProfile from '@/store/users/user'
import Avatar from '@/store/users/avatar'
import Auth from '@/store/auth'
import PostFeed from '@/store/posts/main'

let mobile: Mobile
let userRegister: UserRegister
let userProfile: UserProfile
let avatar: Avatar
let auth: Auth
let postFeed: PostFeed

const initializeStores = (store: Store<any>): void => {
  mobile = getModule(Mobile, store)
  userRegister = getModule(UserRegister, store)
  userProfile = getModule(UserProfile, store)
  avatar = getModule(Avatar, store)
  auth = getModule(Auth, store)
  postFeed = getModule(PostFeed, store)
}

export { initializeStores, mobile, userRegister, userProfile, auth, avatar, postFeed }
