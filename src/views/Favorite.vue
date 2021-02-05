<template>
    <div class="container">
        <div class="row">
            <div v-for="(item, id) of lista" :key="id" class="col-4 boxlista">
                <img :src="item.icon" height="16" alt=""><h3>{{item.name}}</h3>
                <p>{{item.formatted_address}}</p>
                <p>{{item.formatted_phone_number}}</p>
                <p>{{item.website}}</p>
                <button class="btn btn-primary" @click="FavoritosRemove">Remover Favoritos</button>
            </div>
        </div>
        <hr>
    </div>
</template>
<script>

import store from '../store'
export default {
  data () {
    return {
      lista: []
    }
  },
  computed: {
    listaFav: function () {
      return this.$store.state.favorites
    }
  },
  methods: {
    async favoriteLista () {
      for (const item of this.listaFav) {
        await this.$http.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=' + item + '&key=AIzaSyAL5CLsnbv6ski9X4qdHInt9tvj3u-lsJw').then(res => {
          const obj = res.data.result
          this.lista.push(obj)
        })
      }
    },
    FavoritosRemove () {
      store.commit('removeFavorite', this.PlaceSelected.placeId)
    }
  },
  mounted () {
    this.favoriteLista()
  }
}
</script>
<style lang="scss">
    .boxlista{
        background:#CCC;
        padding:1rem;
        border-radius:10px;
        border:1px solid #000;
        margin-top:10px;
    }
</style>
