import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./nav-bar.js";
import Recents from "./recents.js";
import Stats from "./stats.js";
import BestWorstFuncs from "./best-worst-funcs.js";
import Invocations from "./invocations.js";
import Durations from "./durations.js";

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lambdaFunctions: [],
      waste: 0,
      cpu: 0/100,
      coldStarts: 0
    }
  }
  render() {
    return (
      <Router>
        <Route exact path="/" component={Dashboard} {...this.state} />
        <Route exact path={`/${lamdaFunction}`} {...this.state} component={Page2} />
      <Router />
    )
  }
};

ReactDOM.render(<App />, document.getElementById("index"));

{/* <div class="top" >
            <div class="titleDiv">
              <h2 class="title">Lassie</h2>
            </div>
              < Stats /> 
        </div>
        <div class="left">
          < NavBar />
        </div>
        <div class="main">
          < Recents />
          < BestWorstFuncs />
          < Invocations />
          < Durations />
        </div> */}