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
            <br>
            <b-button variant="primary"  @click="$router.push({name: 'editarCurso', ṕarams:{id}})">Editar</b-button>
            <b-button variant="danger" v-b-modal.modal-excluir class="ml-4">Excluir</b-button>
        </b-container>

        <div>
            <b-modal id="modal-excluir" title="Excluir curso" hide-footer >
                <p class="my-4">Você deseja exluir o curso {{ curso.id | formatCodigo }} permanentemente?</p>
                <b-alert variant="success" :show="alertCursoExcluido">Curso excluido com sucesso!!!</b-alert>
                <b-overlay :show="overlayExcluirCurso" rounded="sm">
                    <b-button class="mt-3" variant="danger" block  @click="excluirCurso">Confirmar</b-button>
                    <b-button class="mt-3" block  @click="$bvModal.hide('modal-excluir')">Cancelar</b-button>
                </b-overlay>
            </b-modal>
        </div>
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
            overlayExcluirCurso: false,
            alertCursoExcluido: false
        }
    },
    methods:{
        excluirCurso(){
            this.overlayExcluirCurso = true;
            this.$axios.delete('cursos/delete/'+this.id)
                .then(()=>{
                    this.alertCursoExcluido = true;
                    setTimeout(()=> {
                        this.$store.dispatch('removerCurso', this.id);
                        this.$router.push({name: 'listarCursos'}) 
                    },2000);
                }).catch(()=>{
                    alert('erro ao tentar excluir curso, tente atualizar a pagina novamente');
                });
        }
    },
    computed: {
        cursos() {
            return this.$store.getters.todosCursos;
        },
        curso() {
            let curso = this.$store.getters.cursoId(this.id);
            if(!curso) curso = {id:'', nome:'', descricao:'',conteudo:'', valor:0};
            return curso;
        }
    },
    created(){
        if(!this.id) this.$router.push({ name: 'listarCursos' });
        if(this.cursos.length == 0 ) this.$store.dispatch("pegarCursos");
    }
}
</script>