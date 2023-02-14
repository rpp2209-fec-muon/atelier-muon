import React, { useState, useEffect } from 'react';
import Star from '../Global/Star.jsx';
import { format, parseISO } from 'date-fns';
import Photos from './Photos.jsx';
import axios from 'axios';

export default function Tile({ review }) {

  const [rated, setRated] = useState(false);
  const date = format(parseISO(review.date), 'MMMM d, y');
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulness);
  const [helpfulMessage, setHelpfulMessage] = useState(false);
  const putID = '/' + review.review_id;

  const helpfulHandler = () => {

    setRated(true);

    axios.put('/reviews', {
      params: {
        type: '/helpful',
        review_id: putID,
      }
    })
      .then(() => {
        setHelpfulMessage(true);
        setHelpfulCount(helpfulCount + 1);
      })
  }

  return (
    <div data-testid="tile-instance" className='tile-instance'>
      <Star ratings={review.rating}/>
      <div className='review-user-date'>Submitted by user <b>{review.reviewer_name}</b> on {date}</div>
      <div className='review-summary'><b>{review.summary}</b></div>
      <div className='review-body'>{review.body}</div>
      <Photos photos={review.photos}/>
      {review.recommend &&
        <div className='review-recommend'><i>I recommend this product</i></div>
      }
      <div className='review-helpful-parent'>
        <div className='review-helpful'>Helpful?</div>
        <div className='review-helpful-yes' onClick={() => {!rated ? helpfulHandler() : undefined}}>Yes {helpfulCount}</div>
      </div>
      {helpfulMessage &&
        <div>Thanks for your feedback!</div>
      }
    </div>
  )
}