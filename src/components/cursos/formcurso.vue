<template>

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
            <b-form-textarea required id="descricaoCurso" v-model="curso.descricao" placeholder="Descrição..." rows="3" max-rows="6"/>
        </b-form-group>

        <b-form-group
            label="Conteúdo:"
            label-for="conteudoCurso"
            description="Conteudo que o curso possui"
        >
            <b-form-textarea required id="conteudoCurso" v-model="curso.conteudo" placeholder="Conteúdo..." rows="3" max-rows="6"/>
        </b-form-group>

        <b-form-group
            label="Valor R$:"
            label-for="valorCurso"
            description="Valor do curso em R$"
        >
            <b-form-input id="valorCurso" v-model.number="curso.valor"  type="number" placeholder="R$" required />
        </b-form-group>
        
        <b-alert show variant="danger" dismissible fade v-for="(erro,k) of erros" :key="k" >{{ erro }}!</b-alert>

        <b-button type="submit" variant="primary" class="mr-4">Enviar</b-button>
        <b-button type="reset" variant="danger">limpar</b-button>
    </b-form>

</template>

<script>
export default {
    props: {
        curso:{
            required: true,
            type: Object
        },
        request:{
            required: true,
            type: Function
        }
    },
    beforeRouteLeave (to, from, next) {
        if(!Object.values(this.curso).filter(c => !!c.toString().trim()).length) next();
        else{
            const answer = window.confirm('Você realmente quer sair? Você tem alterações não salvas!');
            if (answer) {
                next()
            } else {
                next(false)
            }
        }
    },
    data(){
        return {
            erros: []
        }
    },
    methods:{
        onSubmit(event){
            event.preventDefault();

            this.request()
            .then((resposta) => {
                if(!resposta.success)
                    this.montarErros(resposta.data);
            });
        },
        onReset(event) {
            event.preventDefault();
            this.$emit('limpa-curso');
            this.erros = {}
        },
        montarErros(newErros){
            let erros = [];
            this.erros = erros;
            setTimeout(()=>{
                for(let erro in newErros){
                    switch(erro){
                        case 'nome': erros.push('Preencha corretamente o nome'); break;
                        case 'descricao': erros.push('Preencha corretamente o descrição'); break;
                        case 'conteudo': erros.push('Preencha corretamente o conteúdo'); break;
                        case 'valor': erros.push('Preencha corretamente o valor R$'); break;
                        default:  erros.push('Preencha os campos corretamente'); break;
                    }
                }
                this.erros = erros;
            },0);
        }
    }
}
</script>