<template>
    <b-card
        no-body
        header-tag="header"
    >
        <template #header>
            <h4 class="mb-0">Cursos</h4>
        </template>
        <b-card-body>
            <router-view/>
        </b-card-body>
    </b-card>
</template>

<script>
export default {
    computed:{
        rotaNome(){
            return this.$router.history.current.name;
        }
    }
}
</script>