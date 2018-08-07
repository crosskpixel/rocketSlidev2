let path = require("path");
let cors = require("cors");
let express = require("express")

var app = require('express')();
app.use((req,res)=>{
    console.log(req.url);
});
app.use(express.static(path.join(__dirname, "public")));




var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(client){
    console.log("USUARIO CONECTADO");
    //mobile
    client.on("VERIFY_TOKEN",(req)=>{
        console.log("VERIFICANDO TOKEN");
        let { token,remote } = req;
        console.log("token"+token+"\nremote"+remote);
        io.sockets.emit(token,{
            token:token,
            remote:remote,
            action:"CONFIRM_TOKEN",
            ajuda:"Envie este token,remote novamente para o listener CONFIRM_TOKEN"
        });
    });

    client.on("CONFIRM_TOKEN",(req)=>{
        console.log("CONFIRMANDO TOKEN");
        let { token,remote } = req;
        io.sockets.emit(token,{
            action:"OPEN_PRESENTATION"
        });
        io.sockets.emit(remote,{
            action:"OPEN_CONTROLS"
        });
    });
    client.on("COMMAND",(req)=>{
        let { token,remote } = req;
        io.sockets.emit(token,{
            action:req.action,
            remote:remote
        });
    });

});
http.listen(80);