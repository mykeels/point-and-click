import '@aws-amplify/ui/dist/style.css';

import React, { useEffect, useState, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';
import './Bubble.css';

import { withAuthenticator } from 'aws-amplify-react';
import Amplify, { API, graphqlOperation } from "aws-amplify";
import awsconfig from "./aws-exports";
import { createTodo } from "./graphql/mutations";
import { listLoginEvents, sortLoginByTypeDate } from "./graphql/queries";
import { onCreateTodo } from "./graphql/subscriptions";
import { v4 as uuid } from "uuid";
import randomColor from "random-color";

Amplify.configure(awsconfig);

const createBubble = ({ x, y, color }) => {
  const bubble = document.createElement('span');
  bubble.classList.add('bubble');
  bubble.style.position = 'fixed';
  bubble.style.left = `${x}px`;
  bubble.style.top = `${y}px`;
  if (color) {
    bubble.style.backgroundColor = color;
  }
  document.body.appendChild(bubble);
  setTimeout(() => {
    document.body.removeChild(bubble);
  }, 1000);
}

function App({ authData: auth }) {
  const { attributes: user } = auth;
  const [points, setPoints] = useState([]);
  const [lastLogin, setLastLogin] = useState(null);
  const id = useMemo(() => uuid(), []);
  const color = useMemo(() => randomColor().hexString(), []);
  useEffect(() => {
    (async () => {
      await API.graphql(graphqlOperation(onCreateTodo)).subscribe({
        next: e => {
          console.log(e)
          if (id !== e.value.data.onCreateTodo.user) {
            createBubble({ x: e.value.data.onCreateTodo.x, y: e.value.data.onCreateTodo.y, color: e.value.data.onCreateTodo.color });
          }
        }
      });

      console.log({ id: user.sub })

      await API.graphql(graphqlOperation(sortLoginByTypeDate, {
        type: "LoginEvent",
        createdAt: {
          lt: new Date().toISOString()
        },
        sortDirection: 'DESC',
        limit: 1
      })).then(res => {
        const loginEvents = res?.data?.sortLoginByTypeDate?.items || [];
        if (loginEvents[0]?.createdAt) {
          setLastLogin(loginEvents[0]?.createdAt)
        }
      }).catch(console.error)
    })();
  }, []);

  useEffect(() => {
    window.onclick = e => {
      const { clientX: x, clientY: y } = e;
      console.log({ x, y });
      createBubble({ x, y, color });
      setPoints(points.concat())
      API.graphql(
        graphqlOperation(createTodo, { input: { x, y, user: id, color } })
      ).then(() => {}).catch(console.error)
    };
  }, []);

  const lastPoint = points[points.length - 1];

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {
          lastLogin ? <p style={{fontSize: '12px', padding: '2px'}}>Last Login: {lastLogin}</p> : null
        }
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
