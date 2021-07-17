<template>
    <div>
        <div class="mb-4"> 
            <b-button class="float-right" @click="$router.push({name: 'listarCursos'})">Voltar para lista</b-button>
        </div>
        <br>
        <b-container class="mt-4">
            <b-row>
                <b-col><strong>Codigo</strong>: {{ curso.id | formatCodigo }}</b-col>
                <b-col><strong>Nome</strong>: {{ curso.nome }}</b-col>
                <b-col><strong>Criado</strong>: {{ curso.created_at | formatDate }}</b-col>
            </b-row>
                <b-row class="mt-4">
                <b-col><strong>Descrição</strong>: {{ curso.descricao }}</b-col>
            </b-row>
                <b-row class="mt-4">
                <b-col><strong>Conteudo</strong>: {{ curso.conteudo }}</b-col>
            </b-row>
                <b-row class="mt-4">
                <b-col><strong>Valor</strong>: {{ curso.valor | formatReal }}</b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
export default {
    props: {
        id:{
            default: 0
        }
    },
    data(){
        return {
            curso: {}
        }
    },
    computed: {
        cursos() {
            return this.$store.getters.todosCursos;
        }
    },
    created(){
        if(!this.cursos.length || !this.id) this.$router.push({ name: 'listarCursos' });
        let curso = this.cursos.filter(curso => curso.id == this.id);
        this.curso = curso[0];
    }
}
</script>