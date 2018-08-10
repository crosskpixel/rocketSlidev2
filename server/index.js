let path = require("path");
let cors = require("cors");
let express = require("express")

var app = require('express')();
app.use(express.static(path.join(__dirname, 'build')));
app.use((req,res,next)=>{
    console.log(req);   
    if(req.url == "/Show"){
        res.sendFile(__dirname+"/build/reveal/visualizador.html");
        //res.sendFile(path.join(__dirname, '/build/reveal', 'visualizador.html'));
    }else{
        res.sendFile(path.join(__dirname, '/build', 'index.html'));
    }
});

var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(client){
    console.log("CONECTOU")
    //mobile
    client.on("VERIFY_TOKEN",(req)=>{
        console.log(req,"VERIFICANDO TOKEN");
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
        console.log(req,"CONFIRMANDO TOKEN");
        let { token,remote } = req;
        io.sockets.emit(token,{
            action:"OPEN_PRESENTATION"
        });
        io.sockets.emit(remote,{
            action:"OPEN_CONTROLS"
        });
    });
    client.on("COMMAND",(req)=>{
        console.log(req,"COMMAND");
        let { token,remote,action } = req;
        io.sockets.emit(token,{
            action:action,
            remote:remote
        });
    });

});
http.listen(3000);