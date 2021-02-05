<template>
  <div class="about container-fluid">
    <form class="row form-signin justify-content-center align-self-center">
      <label for="inputEmail" class="sr-only">E-mail</label>
      <input type="email" id="inputEmail" class="form-control" v-model="email" placeholder="E-mail" required autofocus>
      <label for="inputPassword" class="sr-only">Senha</label>
      <input type="password" id="inputPassword" class="form-control" v-model="senha" placeholder="Senha" required>
      <button class="btn btn-lg btn-primary btn-block" @click="cadastrar">Cadastrar</button>
      <p><router-link class="nav-link" to="/login">Login</router-link></p>
    </form>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data () {
    return {
      email: 'eve.holt@reqres.in',
      senha: 'pistol'
    }
  },
  methods: {
    cadastrar (e) {
      e.preventDefault()
      this.$http.post('https://reqres.in/api/register', { email: this.email, password: this.senha }).then(res => {
        alert('Sucess!')
        this.$router.push('login')
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
