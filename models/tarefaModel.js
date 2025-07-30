// models/tarefaModel.js

class TarefaModel{
    /**
     *
     */
    constructor() {
        this.tarefas = [];
    }

adicionarTarefa(descricao) {
    this.tarefas.push({ id: Date.now(), descricao });
}

obterTarefas() {
    return this.tarefas;
}

removerTarefa(id) {
    this.tarefas = this.tarefas.filter(tarefa => tarefa.id !== id);
}

}

const tarefaModel = new TarefaModel();
export default tarefaModel;
//module.exports = { adicionarTarefa, obterTarefas, removerTarefa };