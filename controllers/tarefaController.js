// controllers/tarefaController.js

const Tarefa = require('../models/tarefaModel');
exports.exibirTarefas = (req, res) => {
    const tarefas = Tarefa.obterTarefas();
    res.render('index', { tarefas });
};
exports.adicionarTarefa = (req, res) => {
    const { descricao } = req.body;
    Tarefa.adicionarTarefa(descricao);
    res.redirect('/');
};
exports.removerTarefa = (req, res) => {
    const { id } = req.params;
    Tarefa.removerTarefa(parseInt(id));
    res.redirect('/');
};