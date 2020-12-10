/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Button,
  Grid,
} from '@material-ui/core';
import raceService from '../services/race';
import CustomTextField from './CustomTextField';

interface AddProps {
  user: string|null,
  year: number,
  championship: string
  race: string,
  track: string,
  enteredlocation: string,
  message: string,
  handleYear: ((year: number) => void),
  handleChampionship: ((championship: string) => void),
  handleRace: ((raceName: string) => void),
  handleTrack: ((track: string) => void),
  handleLocation: ((location: string) => void),
  handleMessage: ((newAddMessage: string) => void),
  resetAddFields: (() => void| null),
  }

const Add = (props: AddProps) => {
  const [IsFormValid, setIsFormValid] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const handleAddYear = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    // console.log(event.target.valueAsNumber);
    props.handleYear(event.target.valueAsNumber);
  };

  const handleAddChampionship = (event:ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.handleChampionship(event.target.value);
  };

  const handleAddRace = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.handleRace(event.target.value);
  };

  const handleAddTrack = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.handleTrack(event.target.value);
  };

  const handleAddLocation = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    props.handleLocation(event.target.value);
  };

  useEffect(() => {
    if (
      props.user
      && props.year > 1893
      && (props.race.length >= 1 && props.race.length < 50)
      && (props.championship.length < 50)
      && (props.track.length >= 1 && props.track.length < 50)
      && (props.enteredlocation.length >= 1 && props.enteredlocation.length < 50)
      // && (race && race.length >= 1 && race.length < 50)
      // && championship.length >= 1
      // (championship && championship.length < 50)
      // (track && track.length >= 1 && track.length < 50)
      // (location && location.length >= 1 && location.length < 50)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [props.user, props.year, props.race, props.championship, props.track, props.enteredlocation]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => { // FormEvent<HTMLFormElement>
    event.preventDefault();
    const raceToAdd = {
      raceName: props.race,
      championship: props.championship,
      year: props.year,
      track: props.track,
      location: props.enteredlocation,
    };

    try {
      console.log('raceToAdd');
      console.log(raceToAdd);
      raceService
        .create(raceToAdd)
        .then(() => {
          props.handleMessage('Race entry added');
          setTimeout(() => {
            props.handleMessage('');
          }, 5000);
        });
    } catch (exception) {
      console.log('failed');
      props.handleMessage('Failed to post');
      setTimeout(() => {
        props.handleMessage('');
      }, 5000);
    }
    props.resetAddFields();
  };

  return (
    <div style={{ width: windowWidth * 0.9, tableLayout: 'auto' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          <h2>Add Missing Races</h2>

          {props.message}
        </Grid>
        <form onSubmit={onSubmit}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <br />
            <div>
              <br />
              <CustomTextField
                id="outlined-basic"
                label="Year"
                className="test"
                variant="outlined"
                type="number"
                value={props.year}
                onChange={handleAddYear}
              />
              <br />
            </div>
            <div>
              <br />
              <CustomTextField
                id="outlined-basic"
                label="Championship"
                className="test"
                variant="outlined"
                value={props.championship}
                onChange={handleAddChampionship}
              />
              <br />
            </div>
            <div>
              <br />
              <CustomTextField
                id="outlined-basic"
                label="Race Name"
                className="test"
                variant="outlined"
                value={props.race}
                onChange={handleAddRace}
              />
              <br />
            </div>
            <div>
              <br />
              <CustomTextField
                id="outlined-basic"
                label="Track"
                className="test"
                variant="outlined"
                value={props.track}
                onChange={handleAddTrack}
              />
              <br />
            </div>
            <div>
              <br />
              <CustomTextField
                id="outlined-basic"
                label="Location"
                className="test"
                variant="outlined"
                value={props.enteredlocation}
                onChange={handleAddLocation}
              />
              <br />
            </div>
            <br />
          </Grid>
          {IsFormValid && (
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <div>
              <br />
              <Button
                disabled={!IsFormValid}
                style={{
                  width: 40,
                  height: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 35,
                  padding: '12px 24px',
                  fontSize: '12px',
                  backgroundColor: '#5f6363',
                  color: '#ebe6e6',
                }}
                variant="contained"
                color="primary"
                type="submit"
              >
                Add
              </Button>
              <br />
              <br />
            </div>
          </Grid>
          )}
        </form>

      </Grid>
      <br />
    </div>
  );
};

export default Add;
