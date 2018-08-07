import React, { Component } from 'react';

import RocketSlideDekstop from './paginas/RocketSlideDesktop';
import RocketSlideMobile from "./paginas/RocketSlideMobile";
import RocketSlideScanner from "./paginas/RocketSlideScanner";

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
            <Route exact path={"/Mobile/q/:param"} component={RocketSlideMobile} />
            <Route exact path={"/Mobile/Scanner"} component={RocketSlideScanner} />
        </div>
    );
  }
}

export default App;
