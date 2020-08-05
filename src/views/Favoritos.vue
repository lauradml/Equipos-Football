<template>
  <div class="about">
    <a name="up"></a>
    <h1 class="titel">Lista de favoritos</h1>
    <div class="shearch">
      <AppSearch @sendFilterData="sendInputValue"></AppSearch>
    </div>
    <el-button class="az" type="primary" @click="aZ">A-Z</el-button>
    <div v-show="showEdit">
      <el-input
        v-model="texFavorito"
        placeholder="Añade un comentario"
        size="sizeInput"
        @input="sendInputFavorito"
      ></el-input>
      <el-button type="primary" icon="el-icon-s-promotion" @click="closeEdit()"></el-button>
    </div>
    <ul>
      <li class="item" v-for="card in favoritosList" :key="card.id">
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
            <p v-show="card.textoFavorito != ''">
              <strong>Tu comentario:</strong>
              {{card.textoFavorito}}
            </p>
            <a href="#up">
              <el-button
                class="button-edit"
                type="primary"
                icon="el-icon-edit"
                @click="openTextFavorito(card.school)"
              >Editar comentario</el-button>
            </a>
            <el-button
              type="primary"
              icon="el-icon-delete"
              @click="deleteFavoritos(card.school)"
            >Borrar</el-button>
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
  name: "Favoritos",
  components: {
    AppSearch
  },
  data() {
    return {
      // favoritosList: [],
      texFavorito: "",
      textoFavorito: "",
      showEdit: null,
      addDatosAux: {},
      filterName:""
    };
  },
  mounted() {
    if (localStorage.getItem("favoritosList")) {
      try {
        this.favoritosList = JSON.parse(localStorage.getItem("favoritosList"));
      } catch (e) {
        localStorage.removeItem("favoritosList");
      }
    }
    this.filterName=this.$store.state.filterNameFav
  },

  //reinicia la seleccion y pone todo los equipos que hay sin seleci
  destroyed(){
    debugger
    this.$store.state.filterNameFav=""
    
  },
  methods: {
    saveFavoritos() {
      debugger
      const parsed = JSON.stringify(this.favoritosList);
      localStorage.setItem("favoritosList", parsed);
      this.$store.state.favoritosList=this.favoritosList

    },
    deleteFavoritos(item) {
      debugger
      let list = this.favoritosList;
      let datosdelete = list.find(e => e.school === item);
      let i = list.indexOf(datosdelete);
      this.favoritosList.splice(i, 1);
      this.saveFavoritos();
    },
    sendInputFavorito(input) {
      this.texFavorito = input;
      let aux = this.addDatosAux;
      this.openTextFavorito(aux.school);
    },
    openTextFavorito(item) {
      this.showEdit = true;
      let datosAdd = this.favoritosList.find(e => e.school === item);
      datosAdd.textoFavorito = this.texFavorito;
      this.addDatosAux = datosAdd;
      this.saveFavoritos();
    },
    closeEdit() {
      this.showEdit = false;
      this.texFavorito = "";
    },

    aZ() {
      this.favoritosList.sort((a, b) => {
        if (a.school < b.school) return -1;
        if (b.school > a.school) return 1;
        return 0;
      });
    },
    sendInputValue(input) {
      debugger
      this.$store.dispatch("filterNameFav", input);
      this.filterName=""
    }
  },
  computed: {
    ...mapState({
      filterNameFav: "filterNameFav"
    }),
    favoritosList: {
      get() {
        debugger
        return this.$store.getters.filteredListFavoritos;
      },
      set(val) {
        return this.$store.state.favoritosList = val;
      }
    }
  }
};
</script>

<style scoped>
.titel {
  color: rgb(19, 85, 151);
}
.az {
  margin-bottom: 10px;
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
.button-edit {
  margin-right: 10px;
}
</style>
