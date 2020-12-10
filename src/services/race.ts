import axios from 'axios';

// eslint-disable-next-line
import Race from '../common/race';

interface CreateRace {
  year: (number)
  championship: (string| null)
  raceName: (string)
  track: (string)
  location: (string)
}

interface UpdateRace {
  year: (number)
  championship: (string| null)
  raceName: (string)
  track: (string)
  location: (string)
  raceId: (number)
  averageScore: (number)
  scoreSum: (number)
  totalReviews: (number)
}

const baseUrl = 'https://msaracereviewapi.azurewebsites.net/api/Races';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getOne = (id: number) => {
  const updateUrl = `${baseUrl}/${id}`;
  const request = axios.get(updateUrl);
  return request.then((response) => response.data);
};

const search = (
  year:number|null,
  raceName: string|null,
  championship: string|null,
  track: string|null,
  location: string|null,
) => {
  // %2A
  let year2;
  let raceName2;
  let championship2;
  let track2;
  let location2;

  if (!year) {
    year2 = 0;
  } else {
    year2 = year;
  }

  if (!raceName) {
    raceName2 = '%2A';
  } else {
    raceName2 = raceName;
  }

  if (!championship) {
    championship2 = '%2A';
  } else {
    championship2 = championship;
  }

  if (!track) {
    track2 = '%2A';
  } else {
    track2 = track;
  }

  if (!location) {
    location2 = '%2A';
  } else {
    location2 = location;
  }
  // https://msaracereviewapi.azurewebsites.net/api/Races/year/0/raceName/%2A/championship/%2A/track/%2A/location/%2A
  const updateUrl = `${baseUrl}/year/${year2}/raceName/${raceName2}/championship/${championship2}/track/${track2}/location/${location2}`;
  const request = axios.get(updateUrl);
  return request.then((response) => response.data);
};

const create = async (raceObject: CreateRace) => {
  const postraceObject = raceObject;
  if (postraceObject.championship === null) {
    postraceObject.championship = '';
  }
  console.log('posting:');
  console.log(postraceObject);
  const response = await axios.post(baseUrl, postraceObject);
  return response.data;
};

const del = async (id: number) => {
  const updateUrl = `${baseUrl}/${id}`;
  const response = await axios.delete(updateUrl);
  return response.data;
};

const update = (id: number, newObject: UpdateRace) => {
  const postnewObject = newObject;
  if (postnewObject.championship === null) {
    postnewObject.championship = '';
  }
  const updateUrl = `${baseUrl}/${id}`;
  const request = axios.put(updateUrl, postnewObject);
  return request.then((response) => response.data);
};

export default {
  getAll, getOne, create, search, del, update,
};
