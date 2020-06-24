import '@aws-amplify/ui/dist/style.css';

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { listTodos } from "./graphql/queries";

Amplify.configure(awsconfig);

function App() {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    (async () => {
      const res = await API.graphql(graphqlOperation(listTodos));
      setPoints(res?.data?.listTodos?.items);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          points.map(point => <p key={point.id}>
            X: <span>{point.x}</span>, Y: <span>{point.y}</span>
          </p>)
        }
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);
