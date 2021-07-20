import axios from "../axios";

export default {
    state: {
        cursos: []
    },
    getters: {
        todosCursos: state => state.cursos,
        cursoId(state){
            return (id) => (state.cursos.filter(curso => curso.id == id))[0];
        }
    },
    mutations: {
        setCursos(state, cursos){
            state.cursos = cursos
        },
        setNovoCurso(state, curso){
            state.cursos.push(curso)
        },
        removeCurso(state, index){
            state.cursos.splice(index,1);
        }
    },
    actions: {
        pegarCursos(context){
            axios.get('cursos')
            .then(res =>{
                context.commit("setCursos", res.data);
            });
        },
        atualizarListaCursos(context, cursos){
            context.commit("setCursos", cursos);
        },
        novoCurso(context, curso){
            context.commit("setNovoCurso", curso);
        },
        removerCurso(context, id){
            let index = context.getters.todosCursos.findIndex(c => c.id == id);
            context.commit("removeCurso", index);
        }
    }
}