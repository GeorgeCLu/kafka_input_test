/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@material-ui/core';
// eslint-disable-next-line import/no-duplicates
import './Chat.css';
// eslint-disable-next-line import/no-duplicates
// import styles from './Chat.css';
// eslint-disable-next-line import/extensions
import CustomTextField from './CustomTextField';

interface Message {
  postTime: string,
  sender: string,
  text: string,
}

interface ChatProps {
  chatMessages: Message[],
  inputMessage: string,
  handleInputMessage: ((typedMessage: string) => void),
  newMessageNotification: string,
  user: string|null,
}

const Chat = (
  props: ChatProps,
) => {
  // const [messages, setMessages] = useState([]);
  // eslint-disable-next-line
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [IsFormValid, setIsFormValid] = useState(false);
  // typescript
  // https://bilot.group/articles/modern-real-time-web-app-with-signalr/
  // const [hubConnection, setHubConnection] = useState<HubConnection>();
  // const apiBaseUrl = 'https://kafkademo.azurewebsites.net';
  const apiBaseUrl = 'https://signalr123456.azurewebsites.net';

  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) => {
    props.handleInputMessage(event.target.value);
  };

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    if (
      1 === 1
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [props.user, props.inputMessage]);

  function createMessage(sender: string, messageText: string) {
    return axios.post(`${apiBaseUrl}/api/messages`, {
      // eslint-disable-next-line object-shorthand
      sender: sender,
      text: messageText,
    }).then((resp) => {
      console.log('message sent', resp);
      props.handleInputMessage('');
    });
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    console.log('sendMessage');
    event.preventDefault();
    if (props.user !== null) {
      createMessage(props.user, props.inputMessage);
    }
  }

  const chatMessagesEndRef = useRef<HTMLDivElement|null>(null); // <FixedSizeList| null>

  const scrollToBottom = () => {
    if (props.chatMessages.length > 0 && chatMessagesEndRef.current !== null) {
      chatMessagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(scrollToBottom, [props.chatMessages]);

  return (
    <div style={{ width: windowWidth * 0.9, tableLayout: 'auto' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <br />
        <div className="post2">
          <div className="hr"><hr /></div>
          <div style={{ width: 300, height: 300, overflow: 'auto' }}>
            <TableContainer component={Paper}>
              <div style={{ overflow: 'auto', height: '300px' }}>
                <Table style={{ tableLayout: 'fixed' }}>
                  <TableBody>
                    {props.chatMessages.map((message) => (
                      <TableRow>
                        <TableCell style={{
                          background: '#eee',
                          margin: 0,
                          padding: 0,
                          borderTopWidth: 1,
                          borderColor: 'black',
                          borderStyle: 'solid',
                          borderRightWidth: 0,
                          borderLeftWidth: 0,
                          borderBottomWidth: 0,
                        }}
                        >
                          <div className="post">
                            <div style={{ padding: 5 }}>
                              <h4>{`${message.sender}${'    '}${message.postTime}`}</h4>
                              <p style={{ wordWrap: 'break-word' }}>{message.text}</p>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    <div ref={chatMessagesEndRef} />
                  </TableBody>
                </Table>
              </div>
            </TableContainer>
          </div>

          <div className="hr"><hr /></div>
        </div>
        {props.newMessageNotification}
        <br />
        <br />
        <form onSubmit={sendMessage}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >

            <div>
              <br />
              <CustomTextField
                placeholder="Message"
                multiline
                rows={6}
                rowsMax={32}
                onChange={handleMessageChange}
                value={props.inputMessage}
                size="medium"
                className="chat"
              />
            </div>
            <div>
              <br />
              {IsFormValid && (
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={!IsFormValid}
                style={{
                  borderRadius: 1000,
                  backgroundColor: '#5f6363',
                  padding: '15px 30px',
                  fontSize: '15px',
                  color: '#ebe6e6',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                Submit
              </Button>
              )}
              <br />
              <br />
            </div>
          </Grid>
        </form>

      </Grid>
    </div>
  );
};

export default Chat;
