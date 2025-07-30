// app.js
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import tarefaController from './controllers/tarefaController.js';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', tarefaController.exibirTarefas);
app.get('/adicionar', (req, res) => res.render('adicionarTarefa'));
app.post('/adicionar', tarefaController.adicionarTarefa);
app.get('/remover/:id', tarefaController.removerTarefa);

const PORT = process.env.PORT || 4400;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));