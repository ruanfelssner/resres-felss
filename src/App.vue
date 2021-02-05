<template>
  <div id="app">

  <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0" v-if="this.$route.name !== 'Login' && this.$route.name !== 'Register'">
      <router-link class="navbar-brand col-sm-3 col-md-2 mr-0" to="/">Reqres</router-link>
      <div class="mr-auto menu">
        <router-link to="/">Home</router-link>
        <router-link to="/favorite">Favorites</router-link>
        <router-link to="/profile">Profile</router-link>
      </div>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <router-link class="nav-link" to="/login" @click="destroySession">Sign out</router-link>
        </li>
      </ul>
    </nav>
    <router-view/>
  </div>
</template>
<script>
import store from './store'
export default {
  methods: {
    destroySession () {
      store.commit('setUser', {})
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.menu{
  a{
    color:#FFF;
    text-transform:uppercase;
    font-size:12px;
    margin-right:15px;
    &:hover{
      opacity:0.7;
      color:#CCC;
      text-decoration:none;
    }
  }
}
</style>
