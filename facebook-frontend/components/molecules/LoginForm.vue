<template>
  <form @submit.prevent="onSubmit">
    <div class="fom-field">
      <BaseInput v-model="email" type="email" placeholder="E-mail" />
    </div>
    <div class="fom-field">
      <BaseInput v-model="password" type="password" placeholder="Senha" />
    </div>

    <NuxtLink to="/recovery"> Esqueceu a senha? </NuxtLink>

    <BaseButton text="Entrar" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { auth } from '@/store'

export default Vue.extend({
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async onSubmit() {
      try {
        await auth.create({
          email: this.email,
          password: this.password
        })

        this.$router.push('/')
      } catch (error) {
        console.log(error)
        this.$notify({
          type: 'error',
          text: 'Oops algo deu errado'
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
form {
  input {
    width: 100% !important;
    padding: 0.7rem 1.2rem;
  }
  display: grid;
  grid-gap: 0.8rem;
  button {
    width: 100%;
  }
  a {
    justify-self: end;
    font-size: 14px;
    color: color(white);
  }
}
</style>
