import React, { Component } from 'react';

import Rocket from "../img/rocket/icon-384x384.png";
import ImageScanQR from "../img/scan.png";
import ImagePassword from "../img/password.png";
import BackGroundAnimated from "../component/backgroundanimated/BackGroundAnimated";
import {isMobile} from "../functions/Utils";

export default class RocketSlideMobile extends Component{


    constructor(props){
        super(props);

        let aState= {
            isMobile:isMobile()
        }

        navigator.getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || 
            navigator.msGetUserMedia);
        if (navigator.getUserMedia) {
            aState.isQrCode = true;
        }else{
            aState.isQrCode = false;
        }

        this.state = {
            ...aState
        };
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
                    
                },
                function(err) {
                    alert("Seu Dispositivo não suporta este recurso");
                }
            );
        }
    }

    ButtonQRCode = () =>{
        return this.state.isQrCode ? 
                <div href="#" style={{backgroundColor:"#49abec",padding:"0.8em",borderRadius:"8px",margin:"0.2em"}} >
                    <span>Scanner QRCode <br/> <img src={ImageScanQR} width={70} /> </span>
                </div> : null
    }

    ButtonInsertCode = () =>{
        return <div href="#" style={{backgroundColor:"#49abec",padding:"0.8em",borderRadius:"8px",margin:"0.2em"}} >
                    <span>Inserir Senha <img src={ImagePassword} width={70} /> </span>
                </div>;
    }

    render(){
        return(
            <div>
              

                <BackGroundAnimated>
                    <div style={{display:"flex",flexDirection:"row"}} >
                        <div style={{flex:1}} ></div>
                        <div style={{flex:2,padding:"1em"}} >
                            <div style={{marginLeft:"1em"}}>
                                <img  width={140} src={Rocket} />
                                <br/>
                                <span>RocketSlide</span>
                            </div>
                        </div>
                        <div style={{flex:1}} ></div>
                    </div>

                    {this.ButtonQRCode()}
                    {this.ButtonInsertCode()}

                </BackGroundAnimated>

            </div>
        );
    }

}