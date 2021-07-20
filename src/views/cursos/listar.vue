<template>
    <div>
        <b-input-group  size="lg" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input-group-prepend is-text>
                <b-icon icon="search"/>
            </b-input-group-prepend>
            <b-form-input type="search" placeholder="Buscar por nome do curso" v-model.trim="nomeCursoBusca"/>
        </b-input-group>
        <br>
        <b-list-group>
            <b-list-group-item v-for="curso in listaDeCursos" :key="curso.id">
            <strong>{{ curso.id | formatCodigo}}</strong> - {{ curso.nome }}
                <router-link :to="{name: 'visualizarCurso', params: {id:curso .id}}">
                    <b-button variant="outline-primary" class="float-right">
                            Visualizar
                    </b-button>
                </router-link>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
export default {
    data(){
        return {
            nomeCursoBusca: ''
        }
    },
    mounted() {
        if(!this.cursos.length)
            this.$store.dispatch('pegarCursos');
    },
    computed:{
        cursos(){
            return this.$store.getters.todosCursos;
        },
        listaDeCursos(){
            let cursos = this.cursos.filter((curso) => {
                let nomeCursoBusca = this.nomeCursoBusca.toLowerCase();
                return (nomeCursoBusca == ''|| curso.nome.toLowerCase().indexOf(nomeCursoBusca)>-1) 
            });
            return cursos.reverse();
        }
    }
}
</script>