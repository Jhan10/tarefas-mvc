// models/tarefaModel.js

class QrCodeManagerModel{
    /**
     *
     */
    constructor() {
        this.titulo = "QrCode Manager";
        this.options = [
            "car"
            ,"house"
            ,"travel"
            ,"other"
        ];
    }



obterTitulo() {
    return this.titulo;
}


}

const qrCodeManagerModel = new QrCodeManagerModel();
export default qrCodeManagerModel;
