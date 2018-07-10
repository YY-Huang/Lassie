import React from "react";
import ReactDOM from "react-dom";
import NavBar from "./nav-bar.js";
import Recents from "./recents.js";
import Stats from "./stats.js";
import BestWorstFuncs from "./best-worst-funcs.js";
import Invocations from "./invocations.js";
import Durations from "./durations.js";
import AWS from "aws-sdk";

let getCredsAndScan = (() => {
  let executed = false;
  return function() {
    if (!executed) {
      executed = true;
      // fetch request for creds from credentials file
      fetch('/creds')
        .then (res => {
          if (res.ok) {
            return res.json();
          } else {
            console.log('Error in response');
          }
        })
        .then(res => {
            AWS.config.update({
              credentials: {
                accessKeyId: res.accessKeyId,
                secretAccessKey: res.secretAccessKey                 
              },
              region: res.region
            })

            let docClient = new AWS.DynamoDB.DocumentClient();

            let params = {
              TableName: 'LassieLogs'
            };

            docClient.scan(params, (err, data) => {
              if(err) {
                console.log('Error reading from db', err);
              } else {
                console.log('Success ', data);
              }
            });
        })
        .catch((err) => console.log('Error ', err));
    }
  };
})();

getCredsAndScan();

// another fetch request here to refresh the data 


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
        <Route exact path={`/${lamdaFunction}`} component={Page2} {...this.state} />
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