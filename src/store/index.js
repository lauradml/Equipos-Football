import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    teamsList: [],
    filterName: '',
    favoritosList: [],
    detail: []
  },
  mutations: {
    saveTeams(state, list) {
      state.teamsList = list.slice(0, 30);
    },
    setFilterName(state, inputName) {
      state.filterName = inputName;
    },
  },
  actions: {
    getTeams({ commit }) {
      axios.get('https://api.collegefootballdata.com/teams/')
        .then((response) => {
          console.log(response.data)
          commit('saveTeams', response.data);
        }).catch(() => {
          console.warn('I have failed');
        })
    },
    filterName({ commit }, inputName) {
      commit('setFilterName', inputName)
    }
  },
  getters: {
    filteredList: state => {
      let filteredCardList = state.teamsList.filter(item =>
        item.school.toLowerCase().includes(state.filterName.toLowerCase())
      );
      return filteredCardList;
    }
  },
  modules: {
  }
})