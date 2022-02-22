import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios, $cookie } from '@/utils/nuxt-instance'
import { Token } from '@/models'

interface CreateToken {
  email: string
  password: string
}

@Module({ name: 'users/register', stateFactory: true, namespaced: true })
export default class UserRegister extends VuexModule {
  private token = null as Token

  get $token() {
    return this.token
  }

  @Mutation
  private UPDATE_TOKEN(token: Token) {
    this.token = token
  }

  @Action
  public async create(payload: CreateToken) {
    const { token } = await $axios.$post('/auth', payload)

    $cookie.set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    })

    this.context.commit('UPDATE_TOKEN', token)
  }

  @Action
  public async delete() {
    await $axios.$delete(`/auth`)

    $cookie.remove('token')

    this.context.commit('UPDATE_TOKEN', null)
  }
}
