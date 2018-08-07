import React, { Component } from 'react';
import QrReader from '../__edit/react-qr-reader';


export default class RocketSlideScanner extends Component{

    constructor(props){
        super(props);
        this.state = {
            delay: 300
          }
    }

    handleError = () =>{
        alert('error');
    }

    handleScan = (str) =>{
        if(str != null){
            alert(str)
        }
    }

    render(){
        return (
        <div style={{padding:"0em 0em",margin:"0px"}} >
            <div style={{height:"6em",backgroundColor:"blue"}} >
                    <h1>RocketSlide</h1>
            </div>
            <QrReader
                delay={this.state.delay}
                onError={this.handleError}
                onScan={this.handleScan}
                />
                <div style={{height:"6em",backgroundColor:"blue"}} >

                </div>  
        </div>)
    }

}

