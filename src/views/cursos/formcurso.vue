<template>
    <b-container>
        <h3>Novo curso</h3>
        <b-form @submit="onSubmit" @reset="onReset" class="mt-4">
            <b-form-group
                label="Nome:"
                label-for="nomeCurso"
                description="Nome do cuso extenso"
            >
                <b-form-input id="nomeCurso" v-model="curso.nome"  type="text" placeholder="Nome" required />
            </b-form-group>
            
             <b-form-group
                label="Descrição:"
                label-for="descricaoCurso"
                description="Descrição sobre o curso em sí"
            >
                <b-form-textarea id="descricaoCurso" v-model="curso.descricao" placeholder="Descrição..." rows="3" max-rows="6"/>
            </b-form-group>

               
             <b-form-group
                label="Conteúdo:"
                label-for="conteudoCurso"
                description="Conteudo que o curso possui"
            >
                <b-form-textarea id="conteudoCurso" v-model="curso.conteudo" placeholder="Conteúdo..." rows="3" max-rows="6"/>
            </b-form-group>

              <b-form-group
                label="Valor R$:"
                label-for="valorCurso"
                description="Valor do curso em R$"
            >
                <b-form-input id="valorCurso" v-model="curso.valor"  type="number" placeholder="R$" required />
            </b-form-group>

            <b-button type="submit" variant="primary" class="mr-4">Enviar</b-button>
            <b-button type="reset" variant="danger">limpar</b-button>
        </b-form>


    </b-container>
</template>

<script>
export default {
    data(){
        return {
            curso: {}
        }
    },
     methods: {
        onSubmit(event) {
            event.preventDefault()
            alert(JSON.stringify(this.curso))
        },
        onReset(event) {
            event.preventDefault();
            this.curso = {};
        }
    },
    beforeRouteLeave (to, from, next) {
        const answer = window.confirm('Você realmente quer sair? Você tem alterações não salvas!');
        if (answer) {
            next()
        } else {
            next(false)
        }
    }
}
</script>