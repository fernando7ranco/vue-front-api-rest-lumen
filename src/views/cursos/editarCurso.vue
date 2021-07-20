<template>
    <b-container>
        <h3>Editar dados do curso {{ id | formatCodigo }}</h3>
        
        <FormCurso @limpa-curso="limpaCurso" :curso="curso" :request="request" />
        <br><br>
        <b-alert variant="success" dismissible fade :show="formSubtidoComSucesso">
            Curso editado com sucesso 
            <router-link tag="a" :to="{name: 'visualizarCurso', params: {id}}">Visualizar curso</router-link>
        </b-alert>
        <br><br>
    </b-container>
</template>

<script>
import FormCurso from '@/components/cursos/formcurso'

export default {
    props:{
        id:{
            required: true
        }
    },
    components:{
        FormCurso
    },
    data(){
        return {
            curso: {},
            cursoOriginal:{},
            formSubtidoComSucesso: false
        }
    },
    computed: {
        cursos() {
            return this.$store.getters.todosCursos;
        }
    },
    methods: {
        limpaCurso(){ 
            this.curso = this.cursoOriginal;
        },
        request() {
            const json = JSON.stringify(this.curso);
            return this.$axios.put('cursos/update/'+ this.id, json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) =>{
                this.$store.dispatch('novoCurso', res.data);
                this.formSubtidoComSucesso = true;
                return { success: true, data: res.data };
            }).catch((error) => {
                this.formSubtidoComSucesso = false;
                return { success: false, data: error.response.data };
            });
        }
    },
    created(){
        console.log('novo curso')
        if(!this.cursos.length || !this.id) this.$router.push({ name: 'listarCursos' });
        this.curso = this.$store.getters.cursoId(this.id);
        this.cursoOriginal = {...this.curso};
    }
}
</script>