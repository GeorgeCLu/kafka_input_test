/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { HubConnection, HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import {
  Container,
  Button,
  Toolbar,
  AppBar,
  IconButton,
  Grid,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import { Alert } from '@material-ui/lab';

import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { useTheme } from '@material-ui/core/styles';

import Home from './components/Home';
import Login from './components/Login';
import Chat from './components/Chat';
import Races from './components/Races';
import Race from './components/Race';
import Add from './components/Add';
import Sidedrawer from './components/Sidedrawer';
import r from './assets/RV3.png';
import raceService from './services/race';
import reviewService from './services/review';
import RaceType from './common/race';
import ReviewType from './common/review';
// eslint-disable-next-line import/no-unresolved
import useStyles from './components/UseStyles';
// import useStyles from './components/UseStyles.js';

interface MessageType {
  postTime: string,
  sender:string,
  text: string,
}

const App = () => {
  const [user, setUser] = useState<string|null>('');

  // -------------------------------------------------------------------------------
  // Chat state and function
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [newMessageNotification, setNewMessageNotification] = useState('');

  const handlemessages = (newMessages: MessageType) => {
    setMessages((messagesArray) => [...messagesArray, newMessages]);
  };

  const handlemessageToSend = (typedMessage: string) => {
    setInputMessage(typedMessage);
  };

  const [connection, setConnection] = useState<HubConnection>();
  // typescript
  // https://bilot.group/articles/modern-real-time-web-app-with-signalr/
  // const [hubConnection, setHubConnection] = useState<HubConnection>();

  function logError(err: any) {
    console.error('Error establishing connection', err);
  }

  async function newMessage(newChatMessage: any) {
    const { sender, text } = newChatMessage;
    const postTime = new Date().toLocaleString();
    handlemessages({
      postTime,
      sender,
      text,
    });
  }

  const apiBaseUrl = 'https://racereviewchatsignalr.azurewebsites.net';
  // const apiBaseUrl = 'https://kafkademo.azurewebsites.net';

  useEffect(() => {
    const createHubConnection = async () => {
      const connect = new HubConnectionBuilder()
        .withUrl(`${apiBaseUrl}/api`)
        .configureLogging(LogLevel.Information)
        .build();
      try {
        console.log('connecting...');
        await connect.start()
          .then((response) => {
            console.log('connection established', response);
          })
          .catch(logError);
      } catch (err) {
        console.log(err);
      }
      setConnection(connect);
    };
    createHubConnection();
  }, []); // can have state here to retry connection

  useEffect(() => {
    try {
      if (connection !== undefined && connection !== null) {
        connection.on('newMessage', newMessage);
      }
    } catch {
      console.log('no message');
    } // eslint-disable-next-line
  }, [connection]); // can have state here to retry connection

  const handlenewMessageNotification = (newNotification: string) => {
    setNewMessageNotification(newNotification);
  };



  useEffect(() => {
    if (messages.length > 0) {
      handlenewMessageNotification(`New Message at:${messages[messages.length - 1].postTime}`);
    }
  }, [messages]); // can have state here to retry connection
  // -------------------------------------------------------------------------------
  // -------------------------------------------------------------------------------



    return (

                  <Chat
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    chatMessages={messages}
                    inputMessage={inputMessage}
                    handleInputMessage={handlemessageToSend}
                    newMessageNotification={newMessageNotification}
                    user={user}
                  />
    )
  
};

export default App;
