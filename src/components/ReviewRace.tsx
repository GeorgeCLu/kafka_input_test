/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react';
import {
  useRouteMatch,
} from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import reviewService from '../services/review';
// import container from './Styles';
// import CustomTextField from './CustomTextField.ts';

// -------------------------CSS------------------------------------

// ------------------------SPEECH RECOGNITION-----------------------------
declare global {
  interface Window {
    SpeechRecognition: any,
    webkitSpeechRecognition: any,
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition:any;
try {
  recognition = new SpeechRecognition();
  recognition.continous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';
} catch {
  recognition = null;
}

interface ReviewRaceProps {
  refreshReviews:(() => void),
  user: string|null,
  setTranscriptToAdd: ((t: string) => void),
  finalTranscriptState: string,
  setFinalTranscriptState: ((transcript: string) => void),
  rating: number,
  setRating: ((rate: number) => void),
  message: string,
  setMessage: ((m: string) => void),
  listening: boolean,
  setListening: ((listen: boolean) => void),
}

interface MatchParams {
  id: string;
}

const ReviewRace = (props: ReviewRaceProps) => {
  const {
    refreshReviews, user, setTranscriptToAdd,
    finalTranscriptState, setFinalTranscriptState,
    rating, setRating,
    message, setMessage,
    listening, setListening,
  } = props;
  const matchurl = useRouteMatch<MatchParams>('/Races/:id');
  let id: number;

  if (matchurl != null) {
    id = Number(matchurl.params.id);
  } else {
    id = 0; // object  possibly zero
  }
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [IsFormValid, setIsFormValid] = useState(false);
  // let interimTranscript;

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
      user
      && finalTranscriptState.length >= 1
      && finalTranscriptState.length < 255
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [user, finalTranscriptState]);

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const reviewToAdd = {
      reviewText: finalTranscriptState,
      reviewScore: rating,
      reviewerName: user,
      raceId: id,
    };

    try {
      reviewService
        .create(reviewToAdd)
        .then(() => {
          setMessage('Successfully added Review!');
          refreshReviews();
          setTimeout(() => {
            setMessage('');
          }, 5000);
        });
    } catch (exception) {
      console.log('failed');
      setMessage('Failed to post');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
    setFinalTranscriptState('');
    setRating(5);
  };

  const handleListen = () => {
    console.log('listening?', listening);
    if (listening) {
      recognition.start();
      recognition.onend = () => {
        console.log('...continue listening...');
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log('Stopped listening per click');
      };
    }

    recognition.onstart = () => {
      console.log('Listening!');
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      // interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const { transcript } = event.results[i][0];
        if (event.results[i].isFinal) {
          console.log('transcript to add');
          console.log(transcript);
          setTranscriptToAdd(transcript);
        } else {
          interimTranscript += transcript;
        }
      }
      const elem = document.getElementById('interim');
      if (typeof elem !== 'undefined' && elem !== null) {
        elem.innerHTML = interimTranscript;
      }
      // <div id="interim" style={interim} />
      // document.getElementById('interim').innerHTML = interimTranscript;

      // document.getElementById('final').innerHTML = finalTranscript;
    };

    //-----------------------------------------------------------------------

    recognition.onerror = (event: any) => {
      console.log(`Error occurred in recognition: ${event.error}`);
    };
  };

  const toggleListen = async () => {
    await setListening(!listening);
    handleListen();
  };

  const handleTranscript = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFinalTranscriptState(event.target.value);
  };

  if (windowWidth > 600) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <div>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <br />
            <h2>
              Review this race
            </h2>
            <br />
            <br />
            Note: Leaving the page will not save entry
            <br />
            <br />
            <div>
              <br />
              <TextField
                className="customSelect"
                label="Score out of 10"
                required
                select
                value={rating}
                type="number"
                onChange={(event) => setRating(parseInt(event.target.value, 10))}
                variant="outlined"
                SelectProps={{ MenuProps: { className: 'customSelectMenu' } }}
              >
                <br />
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
              </TextField>
              <br />
            </div>
          </Grid>
        </div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <div style={{
            width: 500,
            alignItems: 'center',
            textAlign: 'center',
          }}
          >
            <br />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <TextField
                placeholder="Enter review here - up to 255 chracters. Press Record to record voice - functionality only works in Chrome."
                multiline
                rows={6}
                rowsMax={32}
                onChange={handleTranscript}
                value={finalTranscriptState}
                size="medium"
                fullWidth
              />
            </Grid>
          </div>
          <br />
          <div style={{ tableLayout: 'auto', wordWrap: 'break-word' }}>
            <br />
            Heard:
            <div id="interim" />
            <br />
            <br />
          </div>
          {recognition && (
            <Button
              onClick={toggleListen}
              variant="contained"
              color="primary"
              type="submit"
              style={{
                width: 30,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 35,
                padding: '12px 24px',
                fontSize: '12px',
                backgroundColor: '#5f6363',
                color: '#ebe6e6',
              }}
            >
              Record
            </Button>
          )}
          <br />
          <br />
          {IsFormValid && (
          <Button
            disabled={!IsFormValid}
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            type="submit"
            style={{
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 35,
              padding: '12px 24px',
              fontSize: '12px',
              backgroundColor: '#5f6363',
              color: '#ebe6e6',
            }}
          >
            Submit
          </Button>
          )}
          <br />
          <br />
          {message}
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <div>
        <br />
        <h2>
          Review this race
        </h2>
        <br />
        <br />
        <TextField
          className="customSelect"
          label="Score out of 10"
          required
          select
          value={rating}
          type="number"
          onChange={(event) => setRating(parseInt(event.target.value, 10))}
          variant="outlined"
          SelectProps={{ MenuProps: { className: 'customSelectMenu' } }}
        >
          <br />
          <MenuItem value={0}>0</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={9}>9</MenuItem>
          <MenuItem value={10}>10</MenuItem>
        </TextField>
        <br />

        <div>
          <br />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <TextField
              placeholder="Enter review here - up to 255 chracters. Press Record to record voice - functionality only works in Chrome."
              multiline
              rows={6}
              rowsMax={32}
              onChange={handleTranscript}
              value={finalTranscriptState}
              size="medium"
              fullWidth
            />
          </Grid>
          <br />
        </div>
      </div>

      <br />
      <div style={{ tableLayout: 'auto', wordWrap: 'break-word' }}>
        <br />
        Heard:
        <div id="interim" />
      </div>
      <br />
      {recognition && (
        <Button
          onClick={toggleListen}
          variant="contained"
          color="primary"
          type="submit"
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 35,
            padding: '12px 24px',
            fontSize: '12px',
            backgroundColor: '#5f6363',
            color: '#ebe6e6',
          }}
        >
          Record
        </Button>
      )}
      <br />
      <br />
      {IsFormValid && (
        <Button
          disabled={!IsFormValid}
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          type="submit"
          style={{
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 35,
            padding: '12px 24px',
            fontSize: '12px',
            backgroundColor: '#5f6363',
            color: '#ebe6e6',
          }}
        >
          Submit
        </Button>
      )}
      <br />
      <br />
      {message}

    </Grid>
  );
};

export default ReviewRace;
