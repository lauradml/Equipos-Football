<template>
  <div class="home">
    <h1 class="titel">listado de equipos</h1>
    <div class="shearch">
      <AppSearch @sendFilterData="sendInputValue"></AppSearch>
    </div>
    <ul>
      <li class="item" v-for="card in listaFiltrada" :key="card.id">
        <el-col :span="8">
          <el-card>
            <h2>{{card.school}}</h2>
            <div class="content">
              <img v-if="card.logos!= null" class="logo" :src="card.logos[0]" />
            </div>
            <h3>{{card.alt_name2}}</h3>
            <div class="color">
              <p>Color del equipo :</p>
              <div
                :style=" 'width: 75px; height: 40px; border-radius: 4px; margin-left: 10px; background: ' + card.color"
              ></div>
            </div>
            <el-button
              type="primary"
              icon="el-icon-star-off"
              @click="addfavoritos(card.school)"
            >Añadir a favoritos {{ isCardFav(card) ? '⭐️' : '⚪️' }}</el-button>
            <el-button
              type="primary" plain
              icon="el-icon-s-promotion"
              @click="goToDetail(card.school)"
            >Detalle</el-button>
          </el-card>
        </el-col>
      </li>
    </ul>
  </div>
</template>

<script>
import AppSearch from "@/components/AppSearch.vue";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    AppSearch
  },
  data() {
    return {
      serverText: "Buscar equipo",
      textButton: "Buscar",
      showEdit: null,
      detail: [],
      favoritosList: []
    };
  },
  created() {
    this.$store.dispatch("getTeams");
    this.detail = this.$store.state.detail;
    this.favoritosList = this.$store.state.favoritosList;
    if (localStorage.getItem("favoritosList")) {
      try {
        this.favoritosList = JSON.parse(localStorage.getItem("favoritosList"));
      } catch (e) {
        localStorage.removeItem("favoritosList");
      }
    }
  },
  methods: {
    isCardFav(card) {
      let star = false
      this.favoritosList.forEach(element => {
        if (element.school === card.school) {
          star = true;
        }
      }) 
      return star
    },
    sendInputValue(input) {
      this.$store.dispatch("filterName", input);
    },
    openTextFavorito() {
      this.showEdit = true;
    },
    saveFavoritos() {
      const parsed = JSON.stringify(this.favoritosList);
      localStorage.setItem("favoritosList", parsed);
    },
    addfavoritos(item) {
      let datosAdd = this.listaFiltrada.find(e => e.school === item);
      let include = false;
      this.favoritosList.forEach(element => {
        if (element.school === datosAdd.school) {
          include = true;
          alert("el equipo ya esta añadido");
        }
      });
      if (include === false) {
        this.favoritosList.push(datosAdd);
        datosAdd = "";
        this.saveFavoritos();
        this.$router.push("/Favoritos");
      }
    },
    goToDetail(item) {
      let datosAdd = this.listaFiltrada.find(e => e.school === item);
      this.$router.push({ name: "Detail", params: { id: datosAdd } });
    }
  },
  computed: {
    ...mapState({
      list: "teamsList",
      filterName: "filterName"
    }),
    listaFiltrada: function() {
      return this.$store.getters.filteredList;
    }
  }
};
</script>
<style scoped>
.titel{
  color: rgb(19, 85, 151);
}
.item {
  list-style: none;
}
.content {
  display: flex;
  justify-content: center;
}
.logo {
  height: 100px;
  width: 100px;
  overflow: hidden;
  object-fit: cover;
}
.color {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
