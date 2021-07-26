import Vue from 'vue'
import Vuex from 'vuex'

//modulos
import Cursos from './modules/cursos'
import Alunos from './modules/alunos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Cursos,
    Alunos
  }
})
