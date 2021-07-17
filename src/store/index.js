import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cursos: []
  },
  getters: {
    todosCursos: state => {
      return state.cursos;
    }
  },
  mutations: {
    setCursos(state,cursos){
      state.cursos = cursos
    }
  },
  actions: {
    atualizarListaCursos(context, cursos){
      context.commit("setCursos", cursos);
    }
  },
  modules: {
  }
})
