// app.js
import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import tarefaController from './controllers/tarefaController.js';
import qrCodeManagerController from './controllers/qrCodeManagerController.js';

import http from 'http';
const httpServer = new http.Server(app);
import {Server} from 'socket.io';
import { isObject } from 'util';
export const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log(`Um usuário conectou-se. SkcId: ${socket.id}`);
    io.emit("setSocketId", socket.id);

    socket.on('reasonChange', async(data) => {
        if( !qrCodeManagerController.validateReason(data[1])){
            io.emit("noReasonSelectedError",[data[0]]);
        }else{
            const newQrCode = await             qrCodeManagerController.generateQrCodeFromUrl(["socketid","reason"],[data[0],data[1]]);
            io.emit("updateQrCodeImage",[data[0],newQrCode]);
        }
        
    });

    socket.on("afterSuccess", async(data) =>{
        const newQrCode = await qrCodeManagerController.generateQrCode(data[1]);
        io.emit("updateQrCodeImage",[data[0],newQrCode]);
    });
    
});



httpServer.listen(4400, () => {
    console.log('Servidor rodando na porta 4400');
});

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', tarefaController.exibirTarefas);

app.get('/adicionar', (req, res) => res.render('adicionarTarefa'));
app.post('/adicionar', tarefaController.adicionarTarefa);
app.get('/remover/:id', tarefaController.removerTarefa);
app.get('/qrCodeManager', qrCodeManagerController.indexQrCodeManager);

app.get('/qrCodeManager/Confirm/:socketid/:reason', qrCodeManagerController.confirmQrCodeManager);

app.get('/qrCodeManager/Confirm', qrCodeManagerController.confirmQrCodeManager);

const PORT = process.env.PORT || 4400;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));