import axios from "../axios";

export default {
    state: {
        cursos: [],
        alunosCurso: []
    },
    getters: {
        todosCursos: state => state.cursos,
        cursoId(state){
            return (id) => (state.cursos.filter(curso => curso.id == id))[0];
        },
        // alunos curso
        todosAlunosCurso: state => state.alunosCurso,
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
        },
        // alunos curso
        setAlunosCurso(state, alunos){
            state.alunosCurso = alunos
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
        },
        // alunos curso
        pegarAlunosDoCurso(context, idCurso){
            axios.get('cursos/curso/'+idCurso+'/alunos')
            .then(async(res) =>{
                let dados = await Promise.all(res.data.map(async(aluno)=>{
                                await axios.get('alunos/show/'+aluno.aluno_id)
                                    .then(response =>{
                                        aluno.dados = response.data;
                                    });
                                return aluno;
                            }));
                context.commit("setAlunosCurso",dados);
            }).catch(()=> context.commit("setAlunosCurso",[]));
        }
    }
}