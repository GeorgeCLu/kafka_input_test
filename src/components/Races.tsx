/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
} from '@material-ui/core';
import {
  Link,
} from 'react-router-dom';
import raceService from '../services/race';
import RaceFilter from './RaceFilter';
import RaceFilterTwoRow from './RaceFilterTwoRow';
// import container from './Styles';
import CustomTextField from './CustomTextField';
import Race from '../common/race';

interface RacesProp {
  year: number|null,
  raceName: string|null,
  championship: string|null,
  track: string|null,
  location: string|null,
  setRaceYear: ((year: number) => void),
  setRaceChampionship: ((championship: string) => void),
  setRaceName: ((name: string) => void),
  setRaceTrack: ((track: string) => void),
  setRaceLocation: ((location: string) => void),
  races: Race[]|null,
  setRaces: ((returnedRaces: Race[]) => void),
  showFilter: boolean,
  setShowFilter: ((show: any) => void),
  refreshRaces: (() => void),
}
const Races = (props: RacesProp) => {
  const {
    year, raceName, championship, track, location,
    setRaceYear, setRaceChampionship, setRaceName, setRaceTrack, setRaceLocation,
    races, setRaces, showFilter, setShowFilter, refreshRaces,
  } = props;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    refreshRaces();
    // eslint-disable-next-line
  }, []);

  const handleYear = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRaceYear(event.target.valueAsNumber);
  };

  const handleChampionship = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRaceChampionship(event.target.value);
  };

  const handleRace = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRaceName(event.target.value);
  };

  const handleTrack = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRaceTrack(event.target.value);
  };

  const handleLocation = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setRaceLocation(event.target.value);
  };

  /*
  const handleShowRace = (id) => {
    // setCurrentRace(id);
    console.log('handleid')
    console.log(id)

    <Button onClick={() => { handleShowRace(race.raceId); }}>
                      <Link to={`/Races/${race.raceId}`}>View</Link>
                    </Button>
  } */

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      raceService
        .search(year, raceName, championship, track, location)
        .then((returnedRaces) => {
          setRaces(returnedRaces);
        });
    } catch (exception) {
      console.log('failed to search');
    }
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

  if (windowWidth > 1000) {
    return (
      <div style={{ width: windowWidth * 0.9, tableLayout: 'auto' }}>
        <h2>Races</h2>
        <br />
        <form onSubmit={onSubmit}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justify="center"
          >
            <CustomTextField
              id="outlined-basic"
              label="Year"
              className="test"
              variant="outlined"
              type="number"
              value={year}
              onChange={handleYear}
            />
            &nbsp;
            <CustomTextField
              id="outlined-basic"
              label="Championship"
              className="test"
              variant="outlined"
              value={championship}
              onChange={handleChampionship}
            />
            &nbsp;
            <CustomTextField
              id="outlined-basic"
              label="Race Name"
              className="test"
              variant="outlined"
              value={raceName}
              onChange={handleRace}
            />
            &nbsp;
            <CustomTextField
              id="outlined-basic"
              label="Track"
              className="test"
              variant="outlined"
              value={track}
              onChange={handleTrack}
            />
            &nbsp;
            <CustomTextField
              id="outlined-basic"
              label="Location"
              className="test"
              variant="outlined"
              value={location}
              onChange={handleLocation}
            />
            &nbsp;
          </Grid>
          <br />
          <br />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Button
              style={{
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
              Search
            </Button>
          </Grid>
        </form>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <RaceFilterTwoRow
                  field="Year"
                  ascSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => a.year - b.year).map((race) => (race)));
                    }
                  }}
                  descSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => b.year - a.year).map((race) => (race)));
                    }
                  }}
                />

                <RaceFilterTwoRow
                  field="Championship"
                  ascSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => {
                        const textA = a.championship.toUpperCase();
                        const textB = b.championship.toUpperCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                      })
                        .map((race) => (race)));
                    }
                  }}
                  descSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => {
                        const textA = a.raceName.toUpperCase();
                        const textB = b.raceName.toUpperCase();
                        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                      })
                        .map((race) => (race)));
                    }
                  }}
                />

                <RaceFilterTwoRow
                  field="Race Name"
                  ascSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => {
                        const textA = a.raceName.toUpperCase();
                        const textB = b.raceName.toUpperCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                      })
                        .map((race) => (race)));
                    }
                  }}
                  descSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => {
                        const textA = a.championship.toUpperCase();
                        const textB = b.championship.toUpperCase();
                        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                      })
                        .map((race) => (race)));
                    }
                  }}
                />

                <RaceFilterTwoRow
                  field="Track"
                  ascSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => {
                        const textA = a.track.toUpperCase();
                        const textB = b.track.toUpperCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                      })
                        .map((race) => (race)));
                    }
                  }}
                  descSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => {
                        const textA = a.track.toUpperCase();
                        const textB = b.track.toUpperCase();
                        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                      })
                        .map((race) => (race)));
                    }
                  }}
                />

                <RaceFilterTwoRow
                  field="Location"
                  ascSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => {
                        const textA = a.location.toUpperCase();
                        const textB = b.location.toUpperCase();
                        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                      })
                        .map((race) => (race)));
                    }
                  }}
                  descSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => {
                        const textA = a.location.toUpperCase();
                        const textB = b.location.toUpperCase();
                        return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                      })
                        .map((race) => (race)));
                    }
                  }}
                />

                <RaceFilterTwoRow
                  field="Average Score"
                  ascSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => a.averageScore - b.averageScore)
                        .map((race) => (race)));
                    }
                  }}
                  descSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => b.averageScore - a.averageScore)
                        .map((race) => (race)));
                    }
                  }}
                />
                <RaceFilterTwoRow
                  field="Sum of Scores"
                  ascSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => a.scoreSum - b.scoreSum)
                        .map((race) => (race)));
                    }
                  }}
                  descSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => b.scoreSum - a.scoreSum)
                        .map((race) => (race)));
                    }
                  }}
                />

                <RaceFilterTwoRow
                  field="Total Reviews"
                  ascSort={() => {
                    if (races !== null) {
                      setRaces(races.sort((a, b) => a.totalReviews - b.totalReviews)
                        .map((race) => (race)));
                    }
                  }}
                  descSort={() => {
                    if (races !== null) {
                      setRaces(races
                        .sort((a, b) => b.totalReviews - a.totalReviews)
                        .map((race) => (race)));
                    }
                  }}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {(races !== null) && (races.map((race) => (
                <TableRow key={race.raceId}>
                  <TableCell>
                    {race.year}
                  </TableCell>
                  <TableCell>
                    {race.championship}
                  </TableCell>
                  <TableCell>
                    {race.raceName}
                  </TableCell>
                  <TableCell>
                    {race.track}
                  </TableCell>
                  <TableCell>
                    {race.location}
                  </TableCell>
                  <TableCell>
                    {race.averageScore}
                  </TableCell>
                  <TableCell>
                    {race.scoreSum}
                  </TableCell>
                  <TableCell>
                    {race.totalReviews}
                  </TableCell>
                  <TableCell>
                    <Link to={`/Races/${race.raceId}`}>View</Link>
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
  return (
    <div style={{ width: windowWidth * 0.9, tableLayout: 'auto' }}>
      <h2>Races</h2>
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

        {!showFilter && (
        <div>
          <Button
            style={{
              borderRadius: 35,
              padding: '12px 24px',
              fontSize: '12px',
              backgroundColor: '#5f6363',
              color: '#ebe6e6',
            }}
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => { setShowFilter(true); }}
          >
            Search and filter
          </Button>
          <br />
        </div>
        )}

        {showFilter && (
          <div>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Button
                style={{
                  borderRadius: 35,
                  padding: '12px 24px',
                  fontSize: '12px',
                  backgroundColor: '#5f6363',
                  color: '#ebe6e6',
                }}
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => { setShowFilter(false); }}
              >
                Hide
              </Button>
            </Grid>
            <br />
            <br />
            Search:
            <br />
            <br />
            <form onSubmit={onSubmit}>

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
                onChange={handleRace}
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
                <Button
                  style={{
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
                  Search
                </Button>
              </Grid>
            </form>
            <br />
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <br />
              Filter:
              <RaceFilter
                field="Year"
                ascSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => a.year - b.year).map((race) => (race)));
                  }
                }}
                descSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => b.year - a.year).map((race) => (race)));
                  }
                }}
              />
              <br />
              <RaceFilter
                field="Championship"
                ascSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => {
                      const textA = a.championship.toUpperCase();
                      const textB = b.championship.toUpperCase();
                      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    })
                      .map((race) => (race)));
                  }
                }}
                descSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => {
                      const textA = a.raceName.toUpperCase();
                      const textB = b.raceName.toUpperCase();
                      return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                    })
                      .map((race) => (race)));
                  }
                }}
              />
              <br />
              <RaceFilter
                field="Race Name"
                ascSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => {
                      const textA = a.raceName.toUpperCase();
                      const textB = b.raceName.toUpperCase();
                      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    })
                      .map((race) => (race)));
                  }
                }}
                descSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => {
                      const textA = a.championship.toUpperCase();
                      const textB = b.championship.toUpperCase();
                      return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                    })
                      .map((race) => (race)));
                  }
                }}
              />
              <br />
              <RaceFilter
                field="Track"
                ascSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => {
                      const textA = a.track.toUpperCase();
                      const textB = b.track.toUpperCase();
                      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    })
                      .map((race) => (race)));
                  }
                }}
                descSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => {
                      const textA = a.track.toUpperCase();
                      const textB = b.track.toUpperCase();
                      return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                    })
                      .map((race) => (race)));
                  }
                }}
              />
              <br />
              <RaceFilter
                field="Location"
                ascSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => {
                      const textA = a.location.toUpperCase();
                      const textB = b.location.toUpperCase();
                      return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                    })
                      .map((race) => (race)));
                  }
                }}
                descSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => {
                      const textA = a.location.toUpperCase();
                      const textB = b.location.toUpperCase();
                      return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                    })
                      .map((race) => (race)));
                  }
                }}
              />
              <br />
              <RaceFilter
                field="Average Score"
                ascSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => a.averageScore - b.averageScore)
                      .map((race) => (race)));
                  }
                }}
                descSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => b.averageScore - a.averageScore)
                      .map((race) => (race)));
                  }
                }}
              />
              <br />
              <RaceFilter
                field="Sum of Scores"
                ascSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => a.scoreSum - b.scoreSum)
                      .map((race) => (race)));
                  }
                }}
                descSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => b.scoreSum - a.scoreSum)
                      .map((race) => (race)));
                  }
                }}
              />
              <br />
              <RaceFilter
                field="Total Reviews"
                ascSort={() => {
                  if (races !== null) {
                    setRaces(races.sort((a, b) => a.totalReviews - b.totalReviews)
                      .map((race) => (race)));
                  }
                }}
                descSort={() => {
                  if (races !== null) {
                    setRaces(races
                      .sort((a, b) => b.totalReviews - a.totalReviews)
                      .map((race) => (race)));
                  }
                }}
              />
              <br />
            </Grid>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <br />
              <Button
                style={{
                  borderRadius: 35,
                  padding: '12px 24px',
                  fontSize: '12px',
                  backgroundColor: '#5f6363',
                  color: '#ebe6e6',
                }}
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => { setShowFilter(false); }}
              >
                Hide
              </Button>
            </Grid>
          </div>
        )}
      </Grid>
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Race
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(races !== null) && (races.map((race) => (
              <TableRow key={race.raceId}>
                <TableCell>
                  <h4>
                    {race.year}
                    &nbsp;
                    {race.championship}
                  </h4>
                  <br />
                  <h3>
                    {race.raceName}
                  </h3>
                  <br />
                  {race.track}
                  <br />
                  &nbsp;
                  {race.location}
                  <br />
                  Score:
                  &nbsp;
                  {race.averageScore}
                  <br />
                  Do not show:
                  &nbsp;
                  Score sum:
                  {race.scoreSum}
                  &nbsp;
                  Total reviews:
                  {race.totalReviews}
                  <br />
                  <Link to={`/Races/${race.raceId}`}>View</Link>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Races;
