<template>
  <form @submit.prevent="onSubmit">
    <div class="fom-field">
      <BaseInput
        type="email"
        placeholder="E-mail"
        :value="user.email"
        disabled
      />
    </div>
    <div class="fom-field">
      <BaseInput v-model="user.name" type="text" placeholder="Nome" />
    </div>
    <div class="fom-field">
      <BaseInput v-model="user.password" type="password" placeholder="Senha" />
    </div>
    <div class="fom-field">
      <BaseInput
        v-model="user.passwordConfirmation"
        type="password"
        placeholder="Repita a senha"
      />
    </div>
    <BaseButton text="Próxima etapa" />
  </form>
</template>

<script lang="ts">
import vue from 'vue'
import { userRegister } from '@/store'

export default vue.extend({
  data() {
    return {
      user: {
        email: userRegister.$user.email,
        name: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  methods: {
    delay() {
      return new Promise(() => {
        setTimeout(() => {}, 500)
      })
    },
    async onSubmit() {
      try {
        await userRegister.update({
          key: this.$route.params.key,
          name: this.user.name,
          password: this.user.password,
          passwordConfirmation: this.user.passwordConfirmation
        })

        this.$notify({
          type: 'success',
          text: 'Usuário cadastrado com sucesso!'
        })

        await this.delay()

        window.location.href = '/'
      } catch (error) {
        this.$notify({
          type: 'error',
          text: 'Oops, algo deu errado!'
        })
      }
    }
  }
})
</script>

<style lang="scss" scoped>
form {
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
  input {
    width: 100% !important;
    padding: 0.7rem 1.2rem;
  }
}
</style>
