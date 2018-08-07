import React, { Component } from 'react';

import Rocket from "../img/rocket/icon-384x384.png";
import ImageScanQR from "../img/scan.png";
import ImagePassword from "../img/password.png";
import BackGroundAnimated from "../component/backgroundanimated/BackGroundAnimated";
import {isMobile} from "../functions/Utils";
import socketIOClient from "socket.io-client";
import {generateHash} from "../functions/hashGenerator";
import ModalLoading from "../component/modalLoading/modalLoading";

const socket = socketIOClient("http://192.168.1.110:80").connect()

const hasServiceQrCode = () =>{
    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || 
        navigator.msGetUserMedia);
    if (navigator.getUserMedia) {
        return true;
    }else{
        return false
    }
}


export default class RocketSlideMobile extends Component{
    constructor(props){
        super(props);
        this.state = {
            isMobile:isMobile(),
            isQrCode:hasServiceQrCode(),
            showTxtPassword:false,
            valueTxtPassword:""
        };
        console.log(socket);
    }

    scanQRCode(){
        navigator.getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || 
            navigator.msGetUserMedia);
        if (navigator.getUserMedia) {
            navigator.getUserMedia({
                    video: true,
                    audio: false
                },function(localMediaStream) {
                    window.open(window.location.origin+"/Mobile/Scanner");
                },
                function(err) {
                    console.log(err);
                    alert("Seu Dispositivo não suporta este recurso");
                }
            );
        }
    }

    ButtonQRCode = () =>{
        return this.state.isQrCode ? 
                <div href="#" onClick={this.scanQRCode} style={{backgroundColor:"#49abec",padding:"0.8em",borderRadius:"8px",margin:"0.2em"}} >
                    <span>Scanner QRCode <br/> <img src={ImageScanQR} width={70} /> </span>
                </div> : null
    }

    ButtonInsertCode = () =>{
        if(this.state.showTxtPassword){
            return <div>
                <input value={this.state.valueTxtPassword}  onChange={e => this.setState({valueTxtPassword:e.target.value.toUpperCase()})} style={{padding:"1em",height:"2em"}} type="text"  />
                <br/>
                <div className="opacity" onClick={this.verifyToken} style={{backgroundColor:"#49abec",padding:"0.8em",borderRadius:"8px",margin:"0.2em"}} >Iniciar Apresentação</div>
                </div>
        }else{
            return <div className="opacity" onClick={()=>this.setState({showTxtPassword:true,isQrCode:false})} href="#" style={{backgroundColor:"#49abec",padding:"0.8em",borderRadius:"8px",margin:"0.2em"}} >
                   <img src={ImagePassword} width={70} />
                   <br/>
                    <span>Inserir Senha  </span>
                </div>;
        }
    }

    verifyToken = () =>{
        this.refs.modalLoading.openModal();
        let TOKEN_REMOTE = generateHash(6).toUpperCase();
        localStorage.setItem("TOKEN_REMOTE",TOKEN_REMOTE);
        socket.emit("VERIFY_TOKEN",{
            token:this.state.valueTxtPassword,
            remote:TOKEN_REMOTE
        });
        socket.on(TOKEN_REMOTE,res =>{
            console.log(res,"SOCKETIO");
            if(res.action == "OPEN_CONTROLS"){
                alert("ABRIR CONTROLES");
            }
            //this.refs.modalLoading.closeModal();
        });
    }

    resetContent = () =>{
        this.setState({
                isQrCode:hasServiceQrCode(),
                isMobile:isMobile(),
                showTxtPassword:false,
                valueTxtPassword:""
        })
    }

    render(){
        
        return(
            <div>
                <BackGroundAnimated onClick={this.resetContent} >
                    <div style={{display:"flex",flexDirection:"row"}} >
                        <div style={{flex:1}} ></div>
                        <div style={{flex:2,padding:"1em"}} >
                            <div style={{marginLeft:"1em"}}>
                                <img  width={130} src={Rocket} />
                                <br/>
                                <span style={{fontWeight:"bold"}} >RocketSlide</span>
                            </div>
                        </div>
                        <div style={{flex:1}} ></div>
                    </div>
                    {this.ButtonQRCode()}
                    {this.ButtonInsertCode()}
                    <ModalLoading ref="modalLoading" ></ModalLoading>

                </BackGroundAnimated>

            </div>
        );
    }

}