import '@aws-amplify/ui/dist/style.css';

import React from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import Amplify from "aws-amplify";
import awsconfig from "./aws-exports";

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);
