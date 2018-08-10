import React, { Component } from 'react';
import QrReader from '../__edit/react-qr-reader';
import ModalLoading from "../component/modalLoading/modalLoading";
import ImagePassword from "../img/password.png";

const styleTitle = {
    color: "#fff",
    textTransform: "uppercase",
    fontSize: "3em",
    letterSpacing: "4px"
};

export default class RocketSlideScanner extends Component{
    constructor(props){
        super(props);
        this.state = {
            delay: 300
          }
    }

    handleError = (err) =>{
        console.log(err,"ERRO");
    }

    handleScan = (str) =>{
        if(str != null){
            this.refs.modalLoading.openModal();
            this.props.history.push(`/Mobile/q/${str}`);
        }
    }

    render(){
        return (
        <div style={{padding:"0em 0em",margin:"0px"}} >
            <div style={{height:"6em",backgroundColor:"#489dec"}} >
            <div style={{padding:"1em 2em"}} >
                    <h1 style={styleTitle}>RocketSlide</h1>
                    <a href="#" onClick={()=>window.location.reload()} style={{marginLeft:"2em",color:"red"}} >Regarregue a pagina</a>
                </div>
            </div>
            <QrReader
                delay={this.state.delay}
                onError={this.handleError}
                onScan={this.handleScan}
                />
                <ModalLoading ref="modalLoading" ></ModalLoading>
                <div style={{height:"6em",backgroundColor:"#489dec"}} >
                    <div className="opacity" href="#" style={{backgroundColor:"#49abec",padding:"0em",borderRadius:"8px",margin:"0em"}} >
                    <div style={{textAlign:"center"}}>
                        <span onClick={()=>this.props.history.push("/Mobile/q/code")} style={{position:"relative",bottom:"1em"}} >Inserir Senha  </span>
                        <img style={{position:"relative",top:"0.15em"}} src={ImagePassword} width={50} />
                    </div>
                    </div>
                </div>  
        </div>)
    }

}

