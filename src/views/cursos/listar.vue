<template>

    <b-list-group>
        <b-list-group-item v-for="curso in cursos" :key="curso.id">
            {{ curso.nome }}
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
            return this.$store.getters.todosCursos;
        }
    }
}
</script>