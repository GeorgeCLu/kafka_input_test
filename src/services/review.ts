import axios from 'axios';

// eslint-disable-next-line import/extensions
import Review from '../common/review';

interface CreateReview {
  reviewText: (string)
  reviewScore: (number)
  reviewerName: (string|null)
  raceId: (number)
}

const baseUrl = 'https://msaracereviewapi.azurewebsites.net/api/Reviews';

const getReview = (id: number) => {
  const updateUrl = `${baseUrl}/${id}`;
  const request = axios.get(updateUrl);
  return request.then((response) => response.data);
};

const getRaceReviews = (id: number) => {
  const updateUrl = `${baseUrl}/raceId/${id}`;
  const request = axios.get(updateUrl);
  return request.then((response) => response.data);
};

const upvote = (id: number) => {
  // const updateUrl = `${baseUrl}/${id}`;
  const updateUrl = `https://msaracereviewapi.azurewebsites.net/upvote/${id}`;
  const request = axios.put(updateUrl);
  return request.then((response) => response.data);
};

const downvote = (id: number) => {
  // const updateUrl = `${baseUrl}/${id}`;
  const updateUrl = `https://msaracereviewapi.azurewebsites.net/downvote/${id}`;
  const request = axios.put(updateUrl);
  return request.then((response) => response.data);
};

const changeScore = (id: number, newScore: number) => {
  // const updateUrl = `${baseUrl}/${id}`;
  console.log('id');
  console.log(id);
  console.log('newScore');
  console.log(newScore);
  const updateUrl = `https://msaracereviewapi.azurewebsites.net/update/Score/${id}?new_score=${newScore}`;
  // https://msaracereviewapi.azurewebsites.net/update/Score/1?new_score=999
  const request = axios.put(updateUrl);
  return request.then((response) => response.data);
};

const del = async (id: number) => {
  const updateUrl = `${baseUrl}/${id}`;
  const response = await axios.delete(updateUrl);
  return response.data;
};

const create = async (newObject: CreateReview) => {
  const response = await axios.post(baseUrl, newObject);
  return response.data;
};

const update = (id: number, newObject: Review) => {
  const updateUrl = `${baseUrl}/${id}`;
  const request = axios.put(updateUrl, newObject);
  return request.then((response) => response.data);
};

export default {
  getReview, getRaceReviews, upvote, downvote, del, create, update, changeScore,
};
