import React, { Component } from 'react';
import "./backgroundanimated.css";

export default class BackGroundAnimated extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
            <div class="bg"></div>
            <div class="bg bg2"></div>
            <div class="bg bg3"></div>
            <div class="content">
                {this.props.children}
            </div>
            </div>
        )
    }

}