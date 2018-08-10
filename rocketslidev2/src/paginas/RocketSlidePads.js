import React, { Component } from 'react';
import Rocket from "../img/rocket/icon-384x384.png";
import FlexaDireita from "../img/flexa-direita.svg";
import FlexaEsquerda from "../img/flexa-esquerda.svg";
import PortaAberta from "../img/door-open-solid.svg";
import BackGroundAnimated from "../component/backgroundanimated/BackGroundAnimated";
import socketIOClient from "socket.io-client";

//const socket = socketIOClient("http://192.168.1.110:80").connect();
const socket = socketIOClient(window.location.origin).connect();

export default class RocketSlidePads extends Component{
    constructor(props){
        super(props);
        this.state = {
            remote: window.localStorage.getItem("TOKEN_REMOTE"),
            token:window.localStorage.getItem("TOKEN")
        }
    }

    commandSocket = (value)=>{
        socket.emit("COMMAND",{
            token:this.state.token,
            remote:this.state.remote,
            action:value
        });
    }

    finishSession = () =>{
        this.commandSocket("CLOSE");
        this.props.history.push("/Mobile/q/find");
    }

    render(){
        return(
            <div>
                <BackGroundAnimated>
                <div style={{display:"flex",flexDirection:"row"}} >
                        <div style={{flex:5}} >
                            <div onClick={()=>this.finishSession()} href="#" style={{margin:"0em 5em",padding:"0em 1em",backgroundColor:"#fe4141",borderRadius:"8px"}} > <img style={{margin:"0.5em"}} width="50" src={PortaAberta} /> </div>
                        </div>
                </div>
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
                    <div style={{display:"flex",flexDirection:"row"}} >
                        <div style={{flex:1}} >
                            <div onClick={()=>this.commandSocket("PREVIOUS")} href="#" style={{backgroundColor:"#49abec",padding:"0.8em",borderRadius:"8px",margin:"0.2em"}} >
                                <span> <img src={FlexaEsquerda} /> </span>
                            </div>      
                        </div>    
                        <div style={{flex:1}} >
                            <div onClick={()=>this.commandSocket("NEXT")} href="#" style={{backgroundColor:"#49abec",padding:"0.8em",borderRadius:"8px",margin:"0.2em"}} >
                                <span> <img src={FlexaDireita} />  </span>
                            </div>
                        </div>    
                    </div>
                
                
                </BackGroundAnimated>
            </div>
        );
    }

};