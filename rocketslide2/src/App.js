import React, { Component } from 'react';

import RocketSlideDekstop from './paginas/RocketSlideDesktop';
import RocketSlideMobile from "./paginas/RocketSlideMobile";

import {
    BrowserRouter as Router,
    Route,
    Link
  } from 'react-router-dom'

class App extends Component {

    constructor(props){
        super(props);
    }

  render() {

    return (
        <div>
            <Route exact path={"/"} component={RocketSlideDekstop} />
            <Route exact path={"/Mobile/:param"} component={RocketSlideMobile} />
        </div>
    );
  }
}

export default App;
