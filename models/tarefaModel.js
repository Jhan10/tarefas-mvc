// models/tarefaModel.js

let tarefas = [];
function adicionarTarefa(descricao) {
    tarefas.push({ id: Date.now(), descricao });
}
function obterTarefas() {
    return tarefas;
}
function removerTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
}
module.exports = { adicionarTarefa, obterTarefas, removerTarefa };