<template>
    <b-container>
        <h3>Novo curso</h3>
        
        <FormCurso  @limpa-curso="limpaCurso" :curso="curso" :request="request" />
        <br><br>
        <b-alert variant="success" dismissible fade :show="formSubtidoComSucesso">
            Curso registrado com sucesso 
            <router-link tag="a" :to="{name: 'visualizarCurso', params: {id: idNovoCurso}}">Visualizar curso</router-link>
        </b-alert>
        <br><br>
    </b-container>
</template>

<script>
import FormCurso from '@/components/cursos/formcurso'

export default {
    components:{
        FormCurso
    },
    data(){
        return {
            curso: {},
            idNovoCurso: 0,
            formSubtidoComSucesso: false
        }
    },
    methods: {
        limpaCurso(){ this.curso = {};},
        request() {
            const json = JSON.stringify(this.curso);
            return this.$axios.post('cursos/create', json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res) =>{
                this.idNovoCurso = res.data.id;
                this.$store.dispatch('novoCurso', res.data);
                this.formSubtidoComSucesso = true;
                this.limpaCurso();
                return { success: true, data: res.data };
            }).catch((error) => {
                this.formSubtidoComSucesso = false;
                return { success: false, data: error.response.data };
            });
        }
    }
}
</script>