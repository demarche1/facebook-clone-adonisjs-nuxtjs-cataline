import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios, $cookies } from '@/utils/nuxt-instance'
import { User } from '@/models'

@Module({ name: 'users/user', stateFactory: true, namespaced: true })
export default class UserProfile extends VuexModule {
  private user = {} as User

  get $user() {
    return this.user
  }

  @Mutation
  private UPDATE_USER(user: User) {
    this.user = user
  }

  @Action
  public async show() {
    if ($cookies.get('token')) {
      const user = await $axios.$get('/users/profile')

      this.context.commit('UPDATE_USER', user)
    }
  }
}
