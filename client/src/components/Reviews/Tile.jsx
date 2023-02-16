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
      <div className='tile-child review-star-parent'>
      <Star ratings={review.rating}/>
      </div>
      <div className='tile-child review-user-date'>Submitted by user <b>{review.reviewer_name}</b> on {date}</div>
      <div className='tile-child review-summary'><h3>{review.summary}</h3></div>
      <div className='tile-child review-body'>{review.body}</div>
      <Photos photos={review.photos}/>
      {review.recommend &&
        <div className='tile-child review-recommend'><i>I recommend this product</i></div>
      }
      <div className='tile-child review-helpful-parent'>
        <div className='review-helpful'>Helpful?</div>
        <div className='tile-child review-helpful-yes' onClick={() => {!rated ? helpfulHandler() : undefined}}>Yes {helpfulCount}</div>
        {helpfulMessage &&
        <div className='review-helpful-message'>Thanks for your feedback!</div>
        }
      </div>
    </div>
  )
}