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
      <div><b>{review.summary}</b></div>
      <div>{review.body}</div>
      {review.recommend &&
        <div><i>I recommend this product</i></div>
      }
    </div>
  )
}