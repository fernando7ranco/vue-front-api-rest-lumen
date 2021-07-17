<template>
  <div id="app">
      <div>
        <b-navbar toggleable="sm" type="light" variant="light">
          <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
          <b-navbar-brand>Sistema academico</b-navbar-brand>
          <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-item >
                <router-link :to="{name: 'Home'}" tag="span">Home</router-link>
              </b-nav-item>
              <b-nav-item-dropdown text="Cursos" right>
                  <router-link :to="{name: 'novoCurso'}" tag="li" class="dropdown-item">Adicionar novo</router-link>
                  <router-link :to="{name: 'cursos'}" tag="li" class="dropdown-item">Listar</router-link>
              </b-nav-item-dropdown>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <div class="container mt-4">
        <router-view/>
      </div>
  </div>
</template>