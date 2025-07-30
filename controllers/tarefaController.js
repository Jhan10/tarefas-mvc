// controllers/tarefaController.js

import tarefaModel from '../models/tarefaModel.js';

class TarefaController {
    
exibirTarefas = (req, res) => {
    const tarefas = tarefaModel.obterTarefas();
    res.render('index', { tarefas });
};
adicionarTarefa = (req, res) => {
    const { descricao } = req.body;
    tarefaModel.adicionarTarefa(descricao);
    res.redirect('/');
};
removerTarefa = (req, res) => {
    const { id } = req.params;
    tarefaModel.removerTarefa(parseInt(id));
    res.redirect('/');
};
};
const tarefaController = new TarefaController();
export default tarefaController;