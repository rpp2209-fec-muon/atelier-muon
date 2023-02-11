import React, { useState, useEffect } from 'react';
import Star from '../Global/Star.jsx';
import { format, parseISO } from 'date-fns';

export default function Tile({ review }) {

  const date = format(parseISO(review.date), 'MMMM d, y');
  console.log(date);

  return (
    <div data-testid="tile-instance" className='tile-instance'>
      <Star ratings={review.rating}/>
      <div className='review-date'>{date}</div>
      <div className='review-summary'><b>{review.summary}</b></div>
      <div className='review-body'>{review.body}</div>
      {review.recommend &&
        <div className='review-recommend'><i>I recommend this product</i></div>
      }
      <div className='review-name'>{review.reviewer_name}</div>
      <div className='review-helpful-parent'>
        <div className='review-helpful'>Helpful?</div>
        <div className='review-helpful-yes'>Yes {review.helpfulness}</div>
      </div>
    </div>
  )
}