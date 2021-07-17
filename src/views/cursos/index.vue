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
    beforeRouteUpdate(to, from, next){
        console.log('beforeRouteUpdate')
        console.log(to.name )
        if(to.name == 'cursos')
            this.loaded();
        next();
    },
    methods:{
        loaded(){
            console.log('oi')
            this.$axios.get('cursos')
                .then(res =>{
                    this.$store.dispatch('atualizarListaCursos', res.data);
                    this.$router.push({ name: 'listarCursos' }).catch(()=>{});
                });
        }
    },
    computed:{
        rotaNome(){
            return this.$router.history.current.name;
        }
    },
    created(){
        console.log('created')
        if(this.rotaNome == 'cursos') this.loaded();
    }
    
}
</script>