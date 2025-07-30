// controllers/tarefaController.js

import qrCodeManagerModel from '../models/qrCodeManagerModel.js';
import {io} from '../app.js';
import qrcode from 'qrcode';
import dotenv from 'dotenv';
dotenv.config();

class QrCodeManagerController {
    /**
     *
     */
    constructor() {
        const {APP_URL} = process.env;
        this.APP_URL = APP_URL;
    };

    indexQrCodeManager = async (_, res) => {
        const titulo = qrCodeManagerModel.obterTitulo();
        const qrImage = await this.generateQrCodeFromUrl(['padrao'],['padrao']);

        res.render('qrCodeManager', { titulo, qrImage,  });
    };

    confirmQrCodeManager = async (req,res) =>{
        const { reason,socketid } = req.params;
        console.log(req.params);
        io.emit("success",[socketid]);
        console.log("Foi");
    }

    generateQrCodeFromUrl = async (urlDataParam, urlDataValues) => {
        console.log("aqui!!");
        try {
            let urlText = `${this.APP_URL}qrCodeManager/Confirm`;
            urlText += this.mountUrl(urlDataParam, urlDataValues);
            console.log("urlMounted")
            console.log(urlText)

            const url = await qrcode.toDataURL(urlText);
            return url.toString();
        } catch (error) {
            console.error(error);
            return "";
        }
    };

    mountUrl = (params,values)=>{
        let url = "";
        console.log(params);
        params.forEach((param,index)=>{
            url += `/${values[index]}`;
        });
        return url;
    }

    generateQrCode = async (singleData) =>{
                try {
            const url = await qrcode.toDataURL(singleData);
            return url.toString();
        } catch (error) {
            console.error(error);
            return "";
        }
    }

    validateReason = (data) =>{
        console.log("data chane");
        console.log(data);
        console.log(qrCodeManagerModel.options);
        const result=qrCodeManagerModel.options.includes(data);
        console.log(result);
        return result;
    }

};
class UrlDataQrCodeManager {
    /**
     *
     */
    constructor() {
        this.route = "";
        this.params = [];
        this.values = [];
    }
}
const qrCodeManagerController = new QrCodeManagerController();
export default qrCodeManagerController;