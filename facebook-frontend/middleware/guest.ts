import { Middleware } from '@nuxt/types'

const guest: Middleware = ({ store, redirect }) => {
  if (store.state.auth.token) {
    return redirect('/')
  }
}

export default guest
