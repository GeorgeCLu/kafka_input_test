/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useState, useEffect, MouseEvent, ChangeEvent } from 'react';
import {
  TextField,
  Button,
  Container,
  Grid,
} from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import reviewService from '../services/review';
import './Login.css';

import CustomTextField from './CustomTextField';
// eslint-disable-next-line no-unused-vars
import Review from '../common/review';

interface EditReviewFormProps {
  singleReview: Review,
  refreshReviews: (() => void),
  user: string|null,
  text: string,
  setText: ((t: string) => void),
  score:number,
  setScore: ((score: number) => void),
  message: string,
  setMessage: ((fm: string) => void),
}
const EditReviewForm = (props:EditReviewFormProps) => {
  const [IsFormValid, setIsFormValid] = useState(false);

  const {
    singleReview, refreshReviews, user,
    text, setText,
    score, setScore,
    message, setMessage,
  } = props;
  /*
  useEffect(() => {
    try {
      setScore(singleReview.reviewScore);
      setText(singleReview.reviewText);
    } catch {
      console.log('no value');
    }
  }, []);
  */

  useEffect(() => {
    if (
      user
      && text.length >= 1
      && text.length < 255
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [user, text]);

  const handleUpdateScore = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      reviewService
        .changeScore(singleReview.reviewId, score)
        .then(() => {
          setMessage('Review score updated');
          refreshReviews();
          // reviewService.getReview(reviewId).then((review) => setSingleReview(review));
          setTimeout(() => {
            setMessage('');
          }, 5000);
        });
    } catch (exception) {
      console.log('failed to update score');
      setMessage('Failed to update score');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  const handleText = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleUpdateText = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newReview = {
      reviewId: singleReview.reviewId,
      reviewText: text,
      reviewScore: singleReview.reviewScore,
      reviewerName: singleReview.reviewerName,
      upvotes: singleReview.upvotes,
      timeCreated: singleReview.timeCreated,
      raceId: singleReview.raceId,
    };
    try {
      reviewService
        .update(singleReview.reviewId, newReview)
        .then(() => {
          setMessage('Review text updated');
          refreshReviews();
          // reviewService.getReview(reviewId).then((review) => setSingleReview(review));
          setTimeout(() => {
            setMessage('');
          }, 5000);
        });
    } catch (exception) {
      console.log('failed to update text');
      setMessage('Failed to update text');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  return (
    <Container maxWidth="xs">
      <div>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
        >
          Editing Review
          <br />
          <br />
          <TextField
            className="customSelect"
            label="Score out of 10"
            required
            select
            value={score}
            type="number"
            onChange={(event) => setScore(parseInt(event.target.value, 10))}
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
          <br />

          <Button
            onClick={handleUpdateScore}
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
            Update
          </Button>
          <br />
          <br />
          <CustomTextField
            value={text}
            onChange={handleText}
            id="outlined-basic"
            label="Edit Review"
            className="test"
            variant="outlined"
            placeholder="update text"
            multiline
            rows={6}
            rowsMax={32}
          />
          <br />
          <br />
          <Button
            disabled={!IsFormValid}
            onClick={handleUpdateText}
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
            Update
          </Button>
          <br />
          <br />
          {message}
        </Grid>
        <br />
        <br />
      </div>
    </Container>
  );
};

export default EditReviewForm;
