<template>
  <div class="home">
    <h1 class="titel">listado de equipos</h1>
    <div class="shearch">
      <AppSearch @sendFilterData="sendInputValue"></AppSearch>
      <p v-if="this.search !=''">Actualmente hay una seleccion con: {{this.search}}</p>
    </div>
    <a name="up"></a>
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
              @click="addfavoritos(card.school)"
            >Añadir a favoritos {{ isCardFav(card) ? '⭐️' : '⚪️' }}</el-button>
            <el-button
              type="primary"
              plain
              icon="el-icon-s-promotion"
              @click="goToDetail(card.school)"
            >Detalle</el-button>
          </el-card>
        </el-col>
      </li>
    </ul>
    <div>
      <a href="#up">
        <el-pagination
          layout="prev, pager, next"
          :total="totalpage"
          :current-page="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30,40]"
          prev-text="Anterior <"
          next-text="> Siguiente"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        ></el-pagination>
      </a>
    </div>
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
      pageSize: 9,
      currentPage: 1,
      // favoritosList: [],
      loading: true,
      search: ""
    };
  },
  created() {
    this.$store.dispatch("getTeams");
    this.detail = this.$store.state.detail;
    // this.favoritosList = this.$store.state.favoritosList;
    if (localStorage.getItem("favoritosList")) {
      try {
        this.favoritosList = JSON.parse(localStorage.getItem("favoritosList"));
      } catch (e) {
        localStorage.removeItem("favoritosList");
      }
    }
    this.search = this.$store.state.filterName;
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    isCardFav(card) {
      let star = false;
      this.favoritosList.forEach(element => {
        if (element.school === card.school) {
          star = true;
        }
      });
      return star;
    },
    sendInputValue(input) {
      this.$store.dispatch("filterName", input);
      this.search = this.$store.state.filterName;

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
      filterName: "filterName",
      favoritosList: "favoritosList"
    }),
    totalpage() {
      let list = this.$store.getters.filteredList;
      return list.length;
    },
    listaFiltrada: function() {
      let list = this.$store.getters.filteredList;
      return list.slice(
        (this.currentPage - 1) * this.pageSize,
        this.pageSize * this.currentPage
      );
    },
    favoritosList: {
      get() {
        return this.$store.getters.filteredListFavoritos;
      },
      set(val) {
        return (this.$store.state.favoritosList = val);
      }
    }
  }
};
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
}
.titel {
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
