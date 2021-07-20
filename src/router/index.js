import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const CursoIndex = () =>  import('../views/cursos/index')
import novoCurso from '../views/cursos/novoCurso'
import ListarCursos from '../views/cursos/listar';
import Curso from '../views/cursos/curso'
import EditarCurso from '../views/cursos/editarCurso'

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
    redirect: {
      name: 'listarCursos'
    },  
    children: [
      { path: 'novo', name: 'novoCurso',  component: novoCurso },
      { path: 'lista', name: 'listarCursos',  component: ListarCursos },
      { path: ':id', name: 'visualizarCurso',  component: Curso, props: true },
      { path: ':id/editar', name: 'editarCurso',  component: EditarCurso, props: true }
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