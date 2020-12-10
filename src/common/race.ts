// eslint-disable-next-line import/extensions, no-unused-vars
import Review from './review';

export default interface Race {
    year: (number)
    championship: (string)
    raceName: (string)
    track: (string)
    location: (string)
    raceId: (number)
    averageScore: (number)
    scoreSum: (number)
    totalReviews: (number)
    review: (Review[])
  }
