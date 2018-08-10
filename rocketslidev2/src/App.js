import React, { Component } from 'react';

import RocketSlideDesktop from './paginas/RocketSlideDesktop';
import RocketSlideMobile from "./paginas/RocketSlideMobile";
import RocketSlideScanner from "./paginas/RocketSlideScanner";
import RocketSlidePads from "./paginas/RocketSlidePads";

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';

  import { StaticRouter } from 'react-router'


class App extends Component {

    constructor(props){
        super(props);

    }

  render() {
      let context = {};
    return (
        <div>
            <Switch>
                <Route exact path={"/"} component={RocketSlideDesktop} />
                <Route path={"/Mobile/q/:value"} component={RocketSlideMobile} />
                <Route exact path={"/Mobile/Scanner"} component={RocketSlideScanner} />
                <Route exact path={"/Mobile/Pads"} component={RocketSlidePads} />
                <Route render={()=><h1>404</h1>} />
            </Switch>
        </div>
    );
  }
}

export default App;
