import Vue from 'vue'
import Vuex from 'vuex'

//modulos
import Cursos from './modules/cursos'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Cursos
  }
})
