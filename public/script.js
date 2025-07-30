
class QrCodeManager {
    constructor() {
        this.socket = io(window.location.host);
        this.reasonSelect=document.getElementById("OsReasonId");
        this.qrCodeImage = document.getElementById("QrCodeImage");
        this.spSocketId = document.getElementById("spSocketId");
        this.dvValidationMessage = document.getElementById("dvValidationMessage");
        this.loadEvents(this.socket);

        this.socket.on("setSocketId", (data)=>{
            if(data==this.socket.id){
                this.spSocketId.innerHTML = data;
                this.spSocketId.style = "font-weight: 300; color: blue;";
            }
        });

        this.socket.on("updateQrCodeImage", (imageData) => {
            if(imageData[0] == this.socket.id){
                this.qrCodeImage.src=imageData[1].toString();
            }
        });

        this.socket.on("noReasonSelectedError", (data) => {
            if(data[0] == this.socket.id){
            this.setErrorMessage("Selecione um motivo valido antes!");
            }
        });

        this.socket.on("success", (data) => {
            console.log("Foi?");
            console.log(data);
            if (data[0] == this.socket.id) {
                this.qrCodeImage.src = "assets/sucess_at.gif";

                setTimeout(() => {
                    this.socket.emit("afterSuccess",[this.socket.id,"TenteNovamente!"]);
                }, 5000);
            }
        });
        // receive a message from the server
        this.socket.on("hello", (arg) => {
            console.log(arg); //prints "world" 
            console.log("socket.id hello");
            console.log(this.socket.id);
        });

        this.socket.on("logue", (arg) => {
            console.log(arg); //prints "world" 
            console.log("socket.id logue");
            console.log(this.socket.id);
        });

        console.log("socket");
        console.log(this.socket);
        console.log("socket.id");
        console.log(this.socket.id);
        // send a message to the server
        this.socket.emit("houdy", ["stranger", ["SocketId", "IdItem"]]);

    }

    loadEvents(skt) {
        this.reasonSelect.addEventListener("change", (e) => {
            console.log("valueSelected");
            this.dvValidationMessage.innerHTML="";
            const valueSelected = this.reasonSelect.options[this.reasonSelect.selectedIndex].value;
            console.log(`valueSelected: ${valueSelected}`);

            if (valueSelected != "0") {
                skt.emit("reasonChange", [this.socket.id,valueSelected]);
            }else{
                this.setErrorMessage("Selecione um motivo valido.");
            }
        });
    };

    setErrorMessage(text){
        const msg = document.createElement("span");
        this.dvValidationMessage.append(msg.innerHTML=text);
    }
}
const qrCodeManager = new QrCodeManager();
qrCodeManager.setErrorMessage("Olá!");