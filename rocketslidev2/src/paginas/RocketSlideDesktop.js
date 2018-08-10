import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import {generateHash} from "../functions/hashGenerator";
import socketIOClient from "socket.io-client";
import QRCode from "qrcode-react";
import Modal from 'react-responsive-modal';
import { isMobile } from "../functions/Utils";

//const socket = socketIOClient("http://192.168.1.110:80").connect();
const socket = socketIOClient(window.location.origin).connect();

export default class RocketSlideDesktop extends Component {
    constructor(props){
        super(props);

        if(isMobile()){
            this.props.history.push("/Mobile/q/find");
        }

        this.state= {
            token:generateHash(6).toUpperCase().trim(),
            modalVideo:false
        }
        window.localStorage.setItem("TOKEN_VIEW",this.state.token);
    }

componentDidMount(){
    socket.on(this.state.token, (req) => {
        if(req.remote){
            localStorage.setItem("TOKEN_REMOTE",req.remote);
            if(req.action == "CONFIRM_TOKEN"){
                socket.emit("CONFIRM_TOKEN",{
                    token:this.state.token,
                    remote:req.remote
                });
            }
        }
    });
    socket.on(this.state.token,res=>{
        if(res.action == "OPEN_PRESENTATION"){
            document.getElementById("GO-APRESENTATION").click();
            window.localStorage.setItem("TOKEN_VIEW",this.state.token);
            window.open(window.location.origin+"/Show");
        }
    });
}

  render() {

    return (
    <div data-spy="scroll" data-target="#scroll-menu" data-offset="100">
    <div className="preloader-wrap">
        <div className="preloader-inside">
            <div className="preloader">
                <div className="preloader-inner box1"></div>
                <div className="preloader-inner box2"></div>
                <div className="preloader-inner box3"></div>
            </div>
        </div>
    </div>
    <header ref="page_layout" id="home">
        <div className="full-wrap hero-wrap">
            <div className="hero-inner">
                <div className="hero-wrap-inside">
                    <h1>RocketSlide</h1>
                    <span>Controle com seu Smartphone</span>
                    <div className="purchase-button">
                        <a href="#" onClick={()=>this.setState({modalVideo:true})} className="btn btn-default btn-orange"><i className="fa fa-question-circle"></i> Como usar ? </a>
                        <a onClick={()=>scrollToComponent(this.refs.page_layout,{
                             offset: 1000,
                             align: 'bottom',
                             duration: 1500
                        })} className="btn btn-default btn-orange smoothscroll" href="#"><i className="fa fa-play"></i> Começar </a>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <div style={{padding:0}} className="page-layout"  id="page_layout">
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <div className="layout-title">
                        <h2>Acesse este WebSite em seu SmartPhone para utilizar o controle remoto</h2>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xs-12 text-center">
                    <div className="row">
                        <div className="col-xs-12 col-sm-6 col-md-4">
                          
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                            <div className="single-preview">
                                   <div style={{backgroundColor: "#050409d1"}} className="fileUpload btn btn-primary">
                                            <span>
                                            <i className="glyphicon glyphicon-upload"></i> Selecione o arquivo PowerPoint 2010+</span>
                                            <input id="uploadBtn" type="file" className="upload" accept="application/vnd.openxmlformats-officedocument.presentationml.presentation"/>
                                            <input id="to-reveal-btn" type="hidden" />
                                        </div>
                                        <div id="carregando" style={{display: "none",marginTop:"1em"}}>
                                            <span style={{color:"#e97040",fontSize:25,bottom:10,position: "relative"}}>Carrregando...</span>
                                        </div>
                                <div id="div-qrcode" style={{padding:"1em",display:"none"}} >
                                    <QRCode value={this.state.token} />
                                    <br/>
                                     <span style={{fontWeight:"bold"}} >{this.state.token}</span>
                                    <button style={{display:"none"}} id="GO-APRESENTATION">Apresentar</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-6 col-md-4">
                        <div style={{display:"none"}} className="row">
                            <div className="col-lg-12">
                                <div id="error_block" className="alert alert-danger hidden">
                                    O seu browser não suporta
                                </div>
                                <div id="info_block" className="alert alert-success" role="alert">

                                </div>
                                <div id="result_block" className="hidden">
                                    <h3>Slides:</h3>
                                    <div id="result"></div>
                                </div>
                            </div>
	                	</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="preview-footer">
        <div className="container">
            <div className="row">
                <div className="col-xs-12 text-center">
                    <h4><a href="#" onClick={()=>this.setState({modalVideo:true})} className="btn btn-dfault btn-preview"><i className="fa fa-question-circle"></i> Como usar ?</a></h4>
                    Feito com o <i style={{color:"red"}} className="fa fa-heart"></i> | Desenvolvido por <span style={{fontWeight:"bold"}} > IgorPancheski </span>  
                </div>
            </div>
        </div>
    </div>
    <Modal
          open={this.state.modalVideo}
          onClose={()=>this.setState({modalVideo:false})}
          center
          style={{backgroundColor:"red"}}
          classNames={{ modal: 'custom-basic-white' }}
          >

          <iframe id="ytplayer" type="text/html" width="640" height="360"
                src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
            frameborder="0"/>

    </Modal>
    </div>
    );
  }
}


