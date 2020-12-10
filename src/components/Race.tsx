/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable import/extensions */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import {
  useRouteMatch,
} from 'react-router-dom';
import {
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  IconButton,
  Grid,
} from '@material-ui/core';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import raceService from '../services/race';
import reviewService from '../services/review';
import ReviewRace from './ReviewRace';
import EditReviewForm from './EditReviewForm';
import EditRaceForm from './EditRaceForm';
import Filter from './Filter';
import LongText from './LongText';
// import container from './Styles';
import RaceType from '../common/race';
import Review from '../common/review';

interface RaceProps {
  user: string|null,
  singleRace: RaceType|null,
  setSingleRace: ((race: RaceType) => void),
  reviews: Review[],
  setReviews: ((review: Review[]) => void),
  reviewsEditShow: boolean,
  setReviewsEditShow: ((show: boolean) => void),
  reviewsEditShowId: number,
  setReviewsEditShowId: ((idNo: number) => void),
  deleteShow: boolean,
  setDeleteShow: ((show: boolean) => void),
  deleteShowId: number,
  setDeleteShowId: ((idNo: any) => void),
  nonExistant: boolean,
  setMessage: ((singleRaceMessage: any) => void),
  currentRaceId: number,
  setCurrentRaceId:((idNo: any) => void),

  setTranscriptToAdd: ((t: string) => void),
  finalTranscriptState: string,
  setFinalTranscriptState: ((transcript: string) => void),
  racereviewrating: number,
  setracereviewRating: ((rate: number) => void),
  racereviewmessage: string,
  setracereviewMessage: ((m: string) => void),
  listening: boolean,
  setListening: ((listen: boolean) => void),

  editraceformyear : number,
  editraceformchampionship: string,
  editraceformraceName: string,
  editraceformtrack : string,
  editraceformlocation: string,
  handleEditraceformyear : ((year: number) => void),
  handlEditraceformchampionship : ((c: string) => void),
  handleEditraceformraceName: ((rn: string) => void),
  handleEditraceformtrack: ((t: string) => void),
  handleEditraceformlocation: ((l: string) => void),
  editraceformmessage: string,
  handleEditraceformmessage: ((m: string) => void),
  editraceformdeleteShow: boolean,
  handleeditraceformdeleteShow: ((show: boolean) => void),

  editReviewFormText: string,
  handleEditReviewFormText: ((t: string) => void),
  editReviewFormScore:number,
  handleEditReviewFormScore: ((score: number) => void),
  editReviewFormMessage: string,
  handleEditReviewFormMessage: ((fm: string) => void),
}

interface MatchParams {
  id: string;
}

const Race = (props: RaceProps) => {
  const {
    user, singleRace, setSingleRace,
    reviews, setReviews,
    reviewsEditShow, setReviewsEditShow,
    reviewsEditShowId, setReviewsEditShowId,
    deleteShow, setDeleteShow,
    deleteShowId, setDeleteShowId,
    nonExistant, setMessage,
    currentRaceId, setCurrentRaceId,

    setTranscriptToAdd, finalTranscriptState, setFinalTranscriptState,
    racereviewrating, setracereviewRating,
    racereviewmessage, setracereviewMessage,
    listening, setListening,

    editraceformyear, editraceformchampionship, editraceformraceName,
    editraceformtrack, editraceformlocation,
    handleEditraceformyear, handlEditraceformchampionship, handleEditraceformraceName,
    handleEditraceformtrack, handleEditraceformlocation,
    editraceformmessage, handleEditraceformmessage,
    editraceformdeleteShow, handleeditraceformdeleteShow,

    editReviewFormText, handleEditReviewFormText,
    editReviewFormScore, handleEditReviewFormScore,
    editReviewFormMessage, handleEditReviewFormMessage,
  } = props;
  // eslint-disable-next-line no-unused-vars
  const matchurl = useRouteMatch<MatchParams>('/Races/:id');
  let id: number;

  if (matchurl != null) {
    id = Number(matchurl.params.id);
  } else {
    id = 0; // object  possibly zero
  }
  // const [loading, setLoading] = useState(true);

  async function updateRaceToShow(idNo: number) { // move to app
    await raceService.getOne(idNo).then((race) => setSingleRace(race));
    await reviewService.getRaceReviews(idNo).then((reviewsArray) => setReviews(reviewsArray));
    await setCurrentRaceId(idNo);
    // await setLoading(false);

    // reset ReviewRace if go to different race page
    await setTranscriptToAdd('');
    setFinalTranscriptState('');
    setracereviewRating(5);
    setracereviewMessage('');
    setListening(false);

    // reset EditRaceForm if go to different race page
    // handleEditraceformyear(0);
    // handlEditraceformchampionship('');
    // handleEditraceformraceName('');
    // handleEditraceformtrack('');
    // handleEditraceformlocation('');
    handleEditraceformmessage('');
    handleeditraceformdeleteShow(false);

    // reset EditReviewForm if go to different race page
    handleEditReviewFormMessage('');
  }

  useEffect(() => {
    // console.log('id');
    // console.log(id);
    if ((id > 0) && id !== currentRaceId) {
      try {
        // console.log('different')
        // raceService.getOne(id).then((race) => setSingleRace(race));
        // reviewService.getRaceReviews(id).then((reviewsArray) => setReviews(reviewsArray));
        // setCurrentRaceId(id);
        updateRaceToShow(id);
      } catch {
        // setNonExistant(true);
      }
    } // eslint-disable-next-line
  }, [id, currentRaceId]); // currentRaceId?

  const refreshRace = () => {
    raceService.getOne(id).then((race) => setSingleRace(race));
    reviewService.getRaceReviews(id).then((reviewsArray) => setReviews(reviewsArray));
  };

  const refreshReviews = () => {
    raceService.getOne(id).then((race) => setSingleRace(race));
    reviewService.getRaceReviews(id).then((reviewsArray) => setReviews(reviewsArray));
  };

  const handleUpvote = (reviewId: number) => {
    try {
      reviewService
        .upvote(reviewId)
        .then((returnedReview) => {
          setReviews(reviews.map((review) => (review.reviewId !== reviewId
            ? review : returnedReview)));
        });
    } catch (exception) {
      console.log('Failed to Upvote');
    }
  };

  function handleDownvote(reviewId: number) {
    try {
      reviewService
        .downvote(reviewId)
        .then((returnedReview) => {
          setReviews(reviews.map((review) => (review.reviewId !== reviewId
            ? review : returnedReview)));
        });
    } catch (exception) {
      console.log('Failed to Downvote');
    }
  }

  async function handleDelete(reviewId: number) {
    try {
      await reviewService.del(reviewId);
      setMessage('Deleted review');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (exception) {
      console.log('Failed to Delete');
      setMessage('Failed to Delete review');
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
    reviewService.getRaceReviews(id).then((reviewsArray) => setReviews(reviewsArray));
    refreshRace();
  }

  async function handleEdit(reviewId: number) {
    if (reviewId === reviewsEditShowId) {
      setReviewsEditShow(!reviewsEditShow);
    } else if (reviewsEditShow === false) {
      setReviewsEditShow(true);
    }
    setReviewsEditShowId(reviewId);
  }

  async function handleClickDelete(reviewId: number) {
    if (reviewId === deleteShowId) {
      setDeleteShow(!deleteShow);
    } else if (deleteShow === false) {
      setDeleteShow(true);
    }
    setDeleteShowId(reviewId);
  }

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

  if (nonExistant) {
    return (
      <Container maxWidth="xs">
        <br />
      </Container>
    );
  }

  if (!singleRace) {
    return (
      <Container maxWidth="xs">
        <br />
        <h1>
          {id}
        </h1>
        <div>
          404 Not Found - not
        </div>
      </Container>
    );
  }

  if (windowWidth > 650) {
    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >

        <h3>
          {`${singleRace.year} ${singleRace.championship}`}
        </h3>
        <h2>
          {`${singleRace.raceName}`}
        </h2>

        Track:
        {' '}
        {singleRace.track}
        <br />
        Location:
        {' '}
        {singleRace.location}
        <br />
        Average Score:
        {' '}
        {singleRace.averageScore}
        <br />
        Score Sum:
        {' '}
        {singleRace.scoreSum}
        <br />
        Total Reviews:
        {' '}
        {singleRace.totalReviews}

        <br />
        <br />
        {(user === 'admin' || user === 'Admin') && (
          <div>
            <EditRaceForm
              singleRace={singleRace}
              refreshRace={refreshRace}
              user={user}

              year={editraceformyear}
              championship={editraceformchampionship}
              raceName={editraceformraceName}
              track={editraceformtrack}
              location={editraceformlocation}
              setYear={handleEditraceformyear}
              setChampionship={handlEditraceformchampionship}
              setRaceName={handleEditraceformraceName}
              setTrack={handleEditraceformtrack}
              setLocation={handleEditraceformlocation}
              message={editraceformmessage}
              setMessage={handleEditraceformmessage}
              deleteShow={editraceformdeleteShow}
              setDeleteShow={handleeditraceformdeleteShow}
            />
            <br />
            <br />
          </div>
        )}

        <ReviewRace
          refreshReviews={refreshReviews}
          user={user}
          setTranscriptToAdd={setTranscriptToAdd}
          finalTranscriptState={finalTranscriptState}
          setFinalTranscriptState={setFinalTranscriptState}
          rating={racereviewrating}
          setRating={setracereviewRating}
          message={racereviewmessage}
          setMessage={setracereviewMessage}
          listening={listening}
          setListening={setListening}
        />
        <h2>
          <br />
          Reviews
          <br />
        </h2>
        <div style={{ display: 'inline' }}>
          Sort by:
          &nbsp;
          <Filter
            field="Date Posted"
            twoRow={false}
            ascSort={() => {
              setReviews(reviews.sort((a, b) => {
                const textA = a.timeCreated;
                const textB = b.timeCreated;
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
              })
                .map((review) => (review)));
            }}
            descSort={() => {
              setReviews(reviews.sort((a, b) => {
                const textA = a.timeCreated;
                const textB = b.timeCreated;
                return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
              })
                .map((review) => (review)));
            }}
          />
          &nbsp;
          <Filter
            field="Score"
            twoRow={false}
            ascSort={() => {
              setReviews(reviews.sort((a, b) => a.reviewScore - b.reviewScore)
                .map((review) => (review)));
            }}
            descSort={() => {
              setReviews(reviews.sort((a, b) => b.reviewScore - a.reviewScore)
                .map((review) => (review)));
            }}
          />
          &nbsp;
          <Filter
            field="Upvotes"
            twoRow={false}
            ascSort={() => {
              setReviews(reviews.sort((a, b) => a.upvotes - b.upvotes)
                .map((review) => (review)));
            }}
            descSort={() => {
              setReviews(reviews.sort((a, b) => b.upvotes - a.upvotes)
                .map((review) => (review)));
            }}
          />
        </div>
        <br />
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {reviews.map((review) => (
                <TableRow key={review.reviewId}>
                  <TableCell>
                    <h3>
                      {review.reviewerName}
                      <br />
                    </h3>
                    <div style={{ wordWrap: 'break-word' }}>
                      <LongText text={review.reviewText} />
                    </div>
                    <h3>
                      {'Score: '}
                      {review.reviewScore}
                    </h3>
                    {'Time posted: '}
                    {review.timeCreated.substring(0, 10)}
                    {' '}
                    {review.timeCreated.substring(11, 19)}
                    <br />
                    <div style={{
                      justifyContent: 'right',
                      alignItems: 'right',
                    }}
                    >
                      {review.upvotes}
                      &nbsp;
                      <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => { handleUpvote(review.reviewId); }}
                      >
                        <ThumbUpIcon
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 20,
                            height: 20,
                          }}
                        />
                      </IconButton>
                      {' '}
                      <IconButton
                        color="inherit"
                        edge="start"
                        onClick={() => { handleDownvote(review.reviewId); }}
                      >
                        <ThumbDownIcon
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: 20,
                            height: 20,
                          }}
                        />
                      </IconButton>
                      &nbsp;
                      &nbsp;
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!(user === review.reviewerName || user === 'admin' || user === 'Admin')}
                        onClick={() => { handleEdit(review.reviewId); }}
                        style={{
                          width: 20,
                          height: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 35,
                          padding: '12px 24px',
                          fontSize: '12px',
                          backgroundColor: '#5f6363',
                          color: '#ebe6e6',
                        }}
                      >
                        Edit
                      </Button>
                      {' '}
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!(user === review.reviewerName || user === 'admin' || user === 'Admin')}
                        onClick={() => { handleClickDelete(review.reviewId); }}
                        style={{
                          width: 20,
                          height: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 35,
                          padding: '12px 24px',
                          fontSize: '12px',
                          backgroundColor: '#5f6363',
                          color: '#ebe6e6',
                        }}
                      >
                        Delete
                      </Button>
                      {' '}
                      {deleteShow && deleteShowId === review.reviewId
                      && (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={!(user === review.reviewerName || user === 'admin' || user === 'Admin')}
                          onClick={() => { handleDelete(review.reviewId); }}
                          style={{
                            width: 20,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 35,
                            padding: '12px 24px',
                            fontSize: '12px',
                            backgroundColor: '#FF0000',
                            color: '#ebe6e6',
                          }}
                        >
                          Confirm
                        </Button>
                      )}
                    </div>
                    {reviewsEditShow && reviewsEditShowId === review.reviewId
                      && (
                      <EditReviewForm
                        singleReview={review}
                        refreshReviews={refreshReviews}
                        user={user}
                        text={editReviewFormText}
                        setText={handleEditReviewFormText}
                        score={editReviewFormScore}
                        setScore={handleEditReviewFormScore}
                        message={editReviewFormMessage}
                        setMessage={handleEditReviewFormMessage}
                      />
                      )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      </Grid>
    );
  }

  return (
    <div style={{ width: windowWidth * 0.9, tableLayout: 'auto' }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <div style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <h3>
              {singleRace.year}
              {' '}
              {singleRace.championship}
            </h3>
            <h2>
              {singleRace.raceName}
            </h2>

            Track:
            {' '}
            {singleRace.track}
            <br />
            Location:
            {' '}
            {singleRace.location}
            <br />
            Average Score:
            {' '}
            {singleRace.averageScore}
            <br />
            Sum of Score:
            {' '}
            {singleRace.scoreSum}
            <br />
            Total Number of Reviews:
            {' '}
            {singleRace.totalReviews}
            <br />
          </Grid>
          <br />
          {(user === 'admin' || user === 'Admin') && (
          <div>
            <EditRaceForm
              singleRace={singleRace}
              refreshRace={refreshRace}
              user={user}

              year={editraceformyear}
              championship={editraceformchampionship}
              raceName={editraceformraceName}
              track={editraceformtrack}
              location={editraceformlocation}
              setYear={handleEditraceformyear}
              setChampionship={handlEditraceformchampionship}
              setRaceName={handleEditraceformraceName}
              setTrack={handleEditraceformtrack}
              setLocation={handleEditraceformlocation}
              message={editraceformmessage}
              setMessage={handleEditraceformmessage}
              deleteShow={editraceformdeleteShow}
              setDeleteShow={handleeditraceformdeleteShow}
            />
            <br />
            <br />
          </div>
          )}
          <ReviewRace
            refreshReviews={refreshReviews}
            user={user}
            setTranscriptToAdd={setTranscriptToAdd}
            finalTranscriptState={finalTranscriptState}
            setFinalTranscriptState={setFinalTranscriptState}
            rating={racereviewrating}
            setRating={setracereviewRating}
            message={racereviewmessage}
            setMessage={setracereviewMessage}
            listening={listening}
            setListening={setListening}
          />
          <br />
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <h3>
              Reviews
            </h3>
            <br />
            <div>
              Sort by:
              <br />
              <Filter
                field="Date Posted"
                twoRow={false}
                ascSort={() => {
                  setReviews(reviews.sort((a, b) => {
                    const textA = a.timeCreated;
                    const textB = b.timeCreated;
                    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                  })
                    .map((review) => (review)));
                }}
                descSort={() => {
                  setReviews(reviews.sort((a, b) => {
                    const textA = a.timeCreated;
                    const textB = b.timeCreated;
                    return (textA > textB) ? -1 : (textA < textB) ? 1 : 0;
                  })
                    .map((review) => (review)));
                }}
              />
              <br />
              <Filter
                field="Score"
                twoRow={false}
                ascSort={() => {
                  setReviews(reviews.sort((a, b) => a.reviewScore - b.reviewScore)
                    .map((review) => (review)));
                }}
                descSort={() => {
                  setReviews(reviews.sort((a, b) => b.reviewScore - a.reviewScore)
                    .map((review) => (review)));
                }}
              />
              <br />
              <Filter
                field="Upvotes"
                twoRow={false}
                ascSort={() => {
                  setReviews(reviews.sort((a, b) => a.upvotes - b.upvotes)
                    .map((review) => (review)));
                }}
                descSort={() => {
                  setReviews(reviews.sort((a, b) => b.upvotes - a.upvotes)
                    .map((review) => (review)));
                }}
              />
            </div>
            <br />
          </Grid>
          <br />

          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {reviews.map((review) => (
                  <TableRow key={review.reviewId}>
                    <TableCell>
                      <h3>
                        {review.reviewerName}
                        <br />
                      </h3>
                      <div style={{ wordWrap: 'break-word' }}>
                        <LongText text={review.reviewText} />
                      </div>
                      <h3>
                        {'Score: '}
                        {review.reviewScore}
                      </h3>
                      {'Time posted: '}
                      {review.timeCreated.substring(0, 10)}
                      {' '}
                      {review.timeCreated.substring(11, 19)}
                      <br />
                      <div style={{
                        justifyContent: 'right',
                        alignItems: 'right',
                      }}
                      >
                        {review.upvotes}
                        &nbsp;
                        <IconButton
                          color="inherit"
                          edge="start"
                          onClick={() => { handleUpvote(review.reviewId); }}
                        >
                          <ThumbUpIcon
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 20,
                              height: 20,
                            }}
                          />
                        </IconButton>
                        {' '}
                        <IconButton
                          color="inherit"
                          edge="start"
                          onClick={() => { handleDownvote(review.reviewId); }}
                        >
                          <ThumbDownIcon
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: 20,
                              height: 20,
                            }}
                          />
                        </IconButton>
                        &nbsp;
                        &nbsp;
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={!(user === review.reviewerName || user === 'admin' || user === 'Admin')}
                          onClick={() => { handleEdit(review.reviewId); }}
                          style={{
                            width: 20,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 35,
                            padding: '12px 24px',
                            fontSize: '12px',
                            backgroundColor: '#5f6363',
                            color: '#ebe6e6',
                          }}
                        >
                          Edit
                        </Button>
                        {' '}
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          disabled={!(user === review.reviewerName || user === 'admin' || user === 'Admin')}
                          onClick={() => { handleClickDelete(review.reviewId); }}
                          style={{
                            width: 20,
                            height: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 35,
                            padding: '12px 24px',
                            fontSize: '12px',
                            backgroundColor: '#5f6363',
                            color: '#ebe6e6',
                          }}
                        >
                          Delete
                        </Button>
                        {' '}
                        {deleteShow && deleteShowId === review.reviewId
                      && (
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={!(user === review.reviewerName || user === 'admin' || user === 'Admin')}
                        onClick={() => { handleDelete(review.reviewId); }}
                        style={{
                          width: 20,
                          height: 20,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 35,
                          padding: '12px 24px',
                          fontSize: '12px',
                          backgroundColor: '#5f6363',
                          color: '#ebe6e6',
                        }}
                      >
                        Confirm
                      </Button>
                      )}
                      </div>
                      {reviewsEditShow && reviewsEditShowId === review.reviewId
                    && (
                    <EditReviewForm
                      singleReview={review}
                      refreshReviews={refreshReviews}
                      user={user}
                      text={editReviewFormText}
                      setText={handleEditReviewFormText}
                      score={editReviewFormScore}
                      setScore={handleEditReviewFormScore}
                      message={editReviewFormMessage}
                      setMessage={handleEditReviewFormMessage}
                    />
                    )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

      </Grid>
    </div>
  );
};

export default Race;
