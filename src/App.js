import '@aws-amplify/ui/dist/style.css';

import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import './Bubble.css';

import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { createTodo } from "./graphql/mutations";
import { onCreateTodo } from "./graphql/subscriptions";

Amplify.configure(awsconfig);

const createBubble = ({ x, y }) => {
  const bubble = document.createElement('span');
  bubble.classList.add('bubble');
  bubble.style.position = 'fixed';
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  document.body.appendChild(bubble);
  setTimeout(() => {
    document.body.removeChild(bubble);
  }, 1000);
}

function App() {
  const [points, setPoints] = useState([]);
  useEffect(() => {
    (async () => {
      await API.graphql(graphqlOperation(onCreateTodo)).subscribe({
        next: e => {
          setPoints(points.concat(e?.value?.data?.onCreateTodo))
        }
      });
    })();
  }, []);

  useEffect(() => {
    window.onclick = e => {
      const { clientX: x, clientY: y } = e;
      console.log({ x, y });
      createBubble({ x, y });
      API.graphql(
        graphqlOperation(createTodo, { input: { x, y } })
      ).then(() => {}).catch(console.error)
    };
  }, []);

  const lastPoint = points[points.length - 1];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          lastPoint ? <p style={{fontSize: '12px', padding: '2px'}}>
          X: <span>{lastPoint.x}</span>, Y: <span>{lastPoint.y}</span>
        </p> : null
        }
      </header>
    </div>
  );
}

export default withAuthenticator(App, true);
