import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators'
import { $axios, $cookies } from '@/utils/nuxt-instance'
import { Post } from '@/models'

@Module({ name: 'posts/main', stateFactory: true, namespaced: true })
export default class PostFeed extends VuexModule {
  private posts = [] as Post[]

  get $posts() {
    return this.posts
  }

  @Mutation
  private UPDATE_POSTS (posts: Post[]) {
    this.posts = posts
  }

  @Action
  public async index () {
    if($cookies.get('token')) {
      const posts = await $axios.$get('/posts')

      this.context.commit('UPDATE_POSTS', posts)
    }
  }
}
