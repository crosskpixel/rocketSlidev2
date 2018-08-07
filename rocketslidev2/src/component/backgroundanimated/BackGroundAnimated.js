import React, { Component } from 'react';
import "./backgroundanimated.css";

export default class BackGroundAnimated extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
            <div className="bg">  </div>
            <div className="bg bg2"></div>
            <div className="bg bg3"  onClick={this.props.onClick}  ></div>
            <div className="content" >
                {this.props.children}
            </div>
            </div>
        )
    }

}