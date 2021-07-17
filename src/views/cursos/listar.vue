<template>

    <b-list-group>
        <b-list-group-item v-for="curso in cursos" :key="curso.id">
           <strong>{{ curso.id | formatCodigo}}</strong> - {{ curso.nome }}
            <router-link :to="{name: 'visualizarCurso', params: {id:curso .id}}">
                <b-button variant="outline-primary" class="float-right">
                        Visualizar
                </b-button>
            </router-link>
        </b-list-group-item>
    </b-list-group>

</template>

<script>
export default {
    computed: {
        cursos() {
            let cursos = this.$store.getters.todosCursos;
            return cursos.reverse();
        }
    }
}
</script>