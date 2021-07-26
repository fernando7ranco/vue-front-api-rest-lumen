import axios from "../axios";

export default {
    state: {
        alunos: [],
    },
    getters: {
        todosAlunos: state => state.alunos,
    },
    mutations: {
        setAlunos(state, alunos){
            state.alunos = alunos
        },
    },
    actions: {
        pegarAlunos(context){
            axios.get('alunos')
            .then(res =>{
                context.commit("setAlunos", res.data);
            });
        }
    }
}