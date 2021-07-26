<template>
    <b-container class="mt-4" v-show="(alunosCurso.length>0)">
     
        <b-button variant="primary" class="float-right" v-b-modal.modal-add-aluno>Adicionar alunos</b-button>
        <h3 class="flex">Alunos do curso</h3>
        <b-list-group>
            <b-list-group-item v-for="aluno in alunosCurso" :key="aluno.id">
            <strong>{{ aluno.aluno_id | formatCodigo}}</strong> - {{aluno.dados.nome}} - {{aluno.dados.cpf}} 
            </b-list-group-item>
        </b-list-group>

        <div>
            <b-modal @show="alunosParaColocarNoCurso=[]" size="xl" id="modal-add-aluno" :title="`Adicionar aluno no curso ${cursoId}`" >
                
                    <p class="my-4">Você deseja incluir novos alunos no curso {{cursoId | formatCodigo }} permanentemente?</p>
                    <b-input-group>
                        <b-form-select v-model="alunoParaColocarNoCurso" :options="optionsAlunos" />
                        <b-button variant="primary" @click="colocarAlunoNoCurso">Adicionar</b-button>
                    </b-input-group>

                    <b-list-group class="mt-4">
                        <b-list-group-item v-for="(aluno,idx) in alunosParaColocarNoCursoComDados" :key="aluno.id">
                            <strong>{{ aluno.id | formatCodigo}}</strong> - {{aluno.nome}} - {{aluno.cpf}}
                            <b-button class="ml-4 float-right" variant="outline-danger" @click="removerDaListaDeInsercaoNoCurso(idx)">remover</b-button>
                        </b-list-group-item>
                    </b-list-group>

                    <template #modal-footer="{ cancel }">
                        <b-overlay :show="inserindo" rounded="sm">
                            <b-button class="m-4" @click="cancel()">Cancelar</b-button>
                            <b-button variant="outline-primary"  @click="inserirAlunoNoCurso" >Adicionar alunos ao curso</b-button>
                        </b-overlay>
                    </template>
            </b-modal>
        </div>
    </b-container>
</template>
<script>
export default {
    props: {
        cursoId:{
            default: 0
        }
    },
    data() {
        return {
            inserindo: false,
            alunoParaColocarNoCurso: null,
            alunosParaColocarNoCurso: []
        }
    },
    methods:{
        colocarAlunoNoCurso(){
            if(!this.alunoParaColocarNoCurso) return;
            this.alunosParaColocarNoCurso.push({id: this.alunoParaColocarNoCurso});
            this.alunoParaColocarNoCurso = null;
        },
        pegarAluno(id){
            return this.todosAlunos.find(alun => alun.id == id)
        },
        removerDaListaDeInsercaoNoCurso(index){
            this.alunosParaColocarNoCurso.splice(index,1);
        },
        async inserirAlunoNoCurso(){
            this.inserindo = true;
            await Promise.all(this.alunosParaColocarNoCurso.map(aluno =>{
                const json = JSON.stringify({aluno_id: aluno.id});
                return this.$axios.post('cursos/curso/'+this.cursoId+'/alunos', json, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }));
            this.$bvModal.hide('modal-add-aluno');
            this.alunoParaColocarNoCurso = null;
            this.alunosParaColocarNoCurso = [];
            this.$store.dispatch("pegarAlunosDoCurso",this.cursoId);
            this.inserindo = false;
        }
    }, 
    computed: {
        alunosCurso(){
            return this.$store.getters.todosAlunosCurso;
        },
        todosAlunos(){
            return this.$store.getters.todosAlunos;
        },
        optionsAlunos(){
            let alunos = this.todosAlunos.filter(alu => (!this.alunosCurso.find(alun => alun.aluno_id == alu.id)));
            alunos = alunos.filter(alu => (!this.alunosParaColocarNoCurso.find(alun => alun.id == alu.id)));
            let options = alunos.map(alu => ({text: alu.nome + ' - ' + alu.cpf, value: alu.id}));
            options.unshift({text: '(Selecione)', value: null});
            return options;
        },
        alunosParaColocarNoCursoComDados(){
            return this.alunosParaColocarNoCurso.map(alu => this.pegarAluno(alu.id));
        }
    },
    created(){
        this.$store.dispatch("pegarAlunosDoCurso",this.cursoId);
        this.$store.dispatch("pegarAlunos");
    }
}
</script>