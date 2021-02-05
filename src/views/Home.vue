<template>
  <div class="home">

    <div class="container-fluid">
      <div class="row">

        <main role="main" class="col-8 p-0">
          <GmapMap :center="currentLocation" :zoom="15" style="width: 100%; height: calc(100vh - 40px)" @click="clickMap"></GmapMap>
        </main>
        <div class="col-4">
        <p v-if="PlaceSelected.placeId === 0">Selecione uma marcação para avaliar</p>
        <div v-else>
          <img src="@/assets/loading.gif" v-show="loading" height="50" />
          <div class="sidebar-sticky">

            <h2>{{ PlaceSelected.objGoogle.name }}<img :src="PlaceSelected.objGoogle.icon" height="20" class="m-1" alt=""/></h2>
            <div class="Favoritos" v-show="PlaceSelected.placeId != 0">
              <button class="btn btn-primary" @click="Favoritos" v-if="PlaceSelected.favorito === 0">Adicionar aos Favoritos</button>
              <button class="btn btn-primary" @click="FavoritosRemove" v-else>Remover Favoritos</button>
            </div>
            <h3>{{ PlaceSelected.objGoogle.formatted_phone_number }}</h3>
            <p>{{ PlaceSelected.objGoogle.formatted_address }}</p>

            <div class="avaliacao" v-show="PlaceSelected.placeId != 0">
              <hr>
              <p class="text-left m-0">Faça uma avaliação</p>
              <textarea name="avaliacao" class="avaliacaoTexto" id="avaliacao" v-model="PlaceSelected.avaliacao" cols="30" rows="10"></textarea>
              <star-rating :star-size=25 v-model="PlaceSelected.rating" class="mb-3 d-inline-block mr-3"></star-rating>
              <button class="btn btn-primary d-inline-block" @click="Avaliar">Enviar Avaliação</button>
              <hr>
              <div class="comentarios" v-for="(item, id) of PlaceSelected.comentarios" :key="id">
                <star-rating star-size="25" :rating="item.rating" class="mb-1"></star-rating>
                <p>{{ item.avaliacao }}</p>
              </div>
            </div>
          </div>
        </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import store from '../store'

export default {
  name: 'Home',
  data () {
    return {
      currentLocation: { lat: 10, lng: 10 },
      loading: false,
      PlaceSelected: {
        placeId: 0,
        lat: 0,
        lng: 0,
        objGoogle: {
          name: ''
        },
        rating: 0,
        favorito: 0,
        avaliacao: '',
        comentarios: []
      }
    }
  },
  methods: {
    Favoritos () {
      store.commit('setFavorite', this.PlaceSelected.placeId)
      this.PlaceSelected.favorito = 1
    },
    FavoritosRemove () {
      store.commit('removeFavorite', this.PlaceSelected.placeId)
      this.PlaceSelected.favorito = 0
    },
    Avaliar () {
      this.PlaceSelected.comentarios.push({ rating: this.PlaceSelected.rating, avaliacao: this.PlaceSelected.avaliacao })
      store.commit('setComentarios', { rating: this.PlaceSelected.rating, avaliacao: this.PlaceSelected.avaliacao, placeId: this.PlaceSelected.placeId })
      this.PlaceSelected.rating = 0
      this.PlaceSelected.avaliacao = ''
    },
    geolocation () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation.lat = position.coords.latitude
        this.currentLocation.lng = position.coords.longitude
      })
    },
    async clickMap (valor) {
      this.PlaceSelected = {
        placeId: 0,
        lat: 0,
        lng: 0,
        objGoogle: {
          name: ''
        },
        rating: 0,
        favorito: 0,
        avaliacao: '',
        comentarios: []
      }
      this.loading = true
      for (const item of this.$store.state.favorites) {
        if (valor.placeId === item) {
          this.PlaceSelected.favorito = 1
        }
      }
      this.PlaceSelected.placeId = valor.placeId
      this.PlaceSelected.lat = valor.latLng.lat()
      this.PlaceSelected.lng = valor.latLng.lng()
      await this.$http.get('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?place_id=' + this.PlaceSelected.placeId + '&key=AIzaSyAL5CLsnbv6ski9X4qdHInt9tvj3u-lsJw').then(res => {
        this.PlaceSelected.objGoogle = res.data.result
        this.loading = false
      })
    }
  },
  components: {
    StarRating
  },
  mounted () {
    this.geolocation()
  }
}
</script>

<style lang="scss">
h2{
  font-size:17px;
  font-weight:bold;
  margin:1rem 0;
}
h3{
  background:#808080;
  padding:4px 6px;
  font-size:12px !important;
  display:inline-block;
  float:left;
  color:#FFF;
  font-weight:bold;
  border-radius:4px;
}
.Favoritos{
  display:inline-block;
  float:left;
  button{
    font-size:10px;
    text-transform:uppercase;
    font-weight:bold;
    padding:4px 6px;
    margin-right:10px;
  }
}
p{
  display:block;
  width:100%;
  font-size:12px;
  clear:both;
}
  .avaliacao{
    textarea{
      padding:.7rem;
      width:100%;
      display:block;
      outline:none;
      border:1px solid #CCC;
      border-radius:15px;
      margin-bottom:1rem;
      height:100px;
    }
  }
  .comentarios{
    text-align:left;
  }
</style>
