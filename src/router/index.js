import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const CursoIndex = () =>  import('../views/cursos/index')
import FormCurso from '../views/cursos/formcurso'
import ListarCursos from '../views/cursos/listar';
import Curso from '../views/cursos/curso'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/cursos',
    name: 'cursos',
    component: CursoIndex,  
    children: [
      { path: 'novo', name: 'novoCurso',  component: FormCurso },
      { path: 'lista', name: 'listarCursos',  component: ListarCursos },
      { path: ':id', name: 'visualizarCurso',  component: Curso, props: true },
      { path: ':id/editar', name: 'editarCurso',  component: Curso, props: true }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router