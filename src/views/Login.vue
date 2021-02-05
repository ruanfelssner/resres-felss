<template>
  <div class="about">
    <form class="form-signin">
      <label for="inputEmail" class="sr-only">E-mail</label>
      <input type="email" id="inputEmail" class="form-control" v-model="email" placeholder="E-mail" required autofocus>
      <label for="inputPassword" class="sr-only">Senha</label>
      <input type="password" id="inputPassword" class="form-control" v-model="senha" placeholder="Senha" required>
      <button class="btn btn-lg btn-primary btn-block" @click="entrar">Entrar</button>
      <p><router-link class="nav-link" to="/register">Cadastrar-se</router-link></p>
    </form>
  </div>
</template>
<script>

import store from '../store'
export default {
  name: 'Login',
  data () {
    return {
      email: 'eve.holt@reqres.in',
      senha: 'cityslicka'
    }
  },
  methods: {
    entrar (e) {
      e.preventDefault()
      this.$http.post('https://reqres.in/api/login', { email: this.email, password: this.senha }).then(res => {
        alert('Sucess!')
        const obj = {
          email: this.email,
          password: this.senha,
          token: res.data.token,
          requiresLogin: true
        }
        store.commit('setUser', obj)
        this.$router.push('/')
      }).catch(res => {
        alert(res.data.error)
      })
    }
  }
}
</script>
<style lang="scss">
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
  .checkbox {
    font-weight: 400;
  }
  .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
    &:focus {
      z-index: 2;
    }
  }
    input[type="email"] {
      margin-bottom: -1px;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;
    }
    input[type="password"] {
      margin-bottom: 10px;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }
}
</style>
