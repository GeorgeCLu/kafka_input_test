/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import {
  Button,
  Grid,
} from '@material-ui/core';
import { // eslint-disable-next-line
  useRouteMatch, match, RouteComponentProps, useHistory,
} from 'react-router-dom';
import raceService from '../services/race';
import CustomTextField from './CustomTextField';
// eslint-disable-next-line no-unused-vars
import Race from '../common/race';

interface EditRaceFormProps {
  singleRace: Race,
  refreshRace: (() => void),
  user: string,
  year: number,
  championship: string,
  raceName: string,
  track: string,
  location: string,
  setYear: ((year: number) => void),
  setChampionship: ((c: string) => void),
  setRaceName: ((rn: string) => void),
  setTrack: ((t: string) => void),
  setLocation: ((l: string) => void),
  message: string,
  setMessage: ((m: string) => void),
  deleteShow: boolean,
  setDeleteShow: ((show: boolean) => void),
}

interface MatchParams {
  id: string;
}

const EditRaceForm = (props: EditRaceFormProps) => {
  const [IsFormValid, setIsFormValid] = useState(false);
  const matchurl = useRouteMatch<MatchParams>('/Races/:id');
  let id: number;
  if (matchurl != null) {
    id = Number(matchurl.params.id);
  } else {
    id = 0; // object  possibly zero
  }

  const {
    singleRace, refreshRace, user,
    year, championship, raceName, track, location,
    setYear, setChampionship, setRaceName, setTrack, setLocation,
    message, setMessage, deleteShow, setDeleteShow,
  } = props;

  const history = useHistory();

  useEffect(() => {
    if (
      user
      && year
      && raceName.length >= 1
      && raceName.length < 50
      // && championship.length >= 1
      && championship.length < 50
      && track.length >= 1
      && track.length < 50
      && location.length >= 1
      && location.length < 50
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [user, year, raceName, championship, track, location]);

  const handleYear = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setYear(event.target.valueAsNumber);
  };

  const handleChampionship = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setChampionship(event.target.value);
  };

  const handleRaceName = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRaceName(event.target.value);
  };

  const handleTrack = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTrack(event.target.value);
  };

  const handleLocation = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setLocation(event.target.value);
  };

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raceToAdd = {
      raceId: singleRace.raceId,
      raceName,
      championship,
      year,
      track,
      location,
      averageScore: singleRace.averageScore,
      scoreSum: singleRace.scoreSum,
      totalReviews: singleRace.totalReviews,
    };

    try {
      raceService
        .update(singleRace.raceId, raceToAdd)
        .then(() => {
          setMessage('Race entry modified');
          refreshRace();
          // raceService.getOne(raceId).then((race) => setSingleRace(race));
          setTimeout(() => {
            setMessage('');
          }, 5000);
        });
    } catch (exception) {
      console.log('failed');
      setMessage('Failed to update');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  async function handleClickDelete() {
    setDeleteShow(!deleteShow);
  }

  async function handleDelete() {
    try {
      await raceService.del(id);
      setMessage('Deleted race');
      history.push('/');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (exception) {
      console.log('Failed to Delete');
      setMessage('Failed to delete');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <h2>Edit Race</h2>
        {message}
        <form onSubmit={handleUpdate}>
          <br />
          <CustomTextField
            id="outlined-basic"
            label="Year"
            className="test"
            variant="outlined"
            type="number"
            value={year}
            onChange={handleYear}
          />
          <br />
          <br />
          <CustomTextField
            id="outlined-basic"
            label="Championship"
            className="test"
            variant="outlined"
            value={championship}
            onChange={handleChampionship}
          />
          <br />
          <br />
          <CustomTextField
            id="outlined-basic"
            label="Race Name"
            className="test"
            variant="outlined"
            value={raceName}
            onChange={handleRaceName}
          />
          <br />
          <br />
          <CustomTextField
            id="outlined-basic"
            label="Track"
            className="test"
            variant="outlined"
            value={track}
            onChange={handleTrack}
          />
          <br />
          <br />
          <CustomTextField
            id="outlined-basic"
            label="Location"
            className="test"
            variant="outlined"
            value={location}
            onChange={handleLocation}
          />
          <br />
          <br />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <br />
            {IsFormValid && (
            <Button
              disabled={!IsFormValid}
              style={{
                borderRadius: 1000,
                backgroundColor: '#5f6363',
                padding: '15px 30px',
                fontSize: '15px',
                color: '#ebe6e6',
                justifyContent: 'center',
                alignItems: 'center',
                width: 40,
                height: 40,
              }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Edit
            </Button>
            )}
          </Grid>
        </form>
        <div>
          <br />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => { handleClickDelete(); }}
            style={{
              borderRadius: 1000,
              backgroundColor: '#5f6363',
              padding: '15px 30px',
              fontSize: '15px',
              color: '#ebe6e6',
              justifyContent: 'center',
              alignItems: 'center',
              width: 40,
              height: 40,
            }}
          >
            Delete
          </Button>
          <br />
        </div>

        {deleteShow
                      && (
                        <div>
                          <br />
                          <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            onClick={() => { handleDelete(); }}
                            style={{
                              borderRadius: 10,
                              backgroundColor: '#FF0000',
                              padding: '15px 30px',
                              fontSize: '15px',
                              color: '#ebe6e6',
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 70,
                              height: 70,
                            }}
                          >
                            Confirm
                          </Button>
                          <br />
                        </div>
                      )}

      </Grid>
    </div>
  );
};

export default EditRaceForm;
