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
    },
    cursoId(state){
      return (id) => (state.cursos.filter(curso => curso.id == id))[0];
    }
  },
  mutations: {
    setCursos(state, cursos){
      state.cursos = cursos
    },
    setNovoCurso(state, curso){
      state.cursos.push(curso)
    }
  },
  actions: {
    atualizarListaCursos(context, cursos){
      context.commit("setCursos", cursos);
    },
    novoCurso(context, curso){
      context.commit("setNovoCurso", curso);
    }
    
  },
  modules: {
  }
})
