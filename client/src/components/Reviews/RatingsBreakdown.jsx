import React, { useState, useEffect } from 'react';
import Star from '../Global/Star.jsx';

export default function RatingsBreakdown({ meta, getAverageRating }) {

  console.log(meta);

  const parseReviewTotal = (obj) => {
    var count = 0
    for (let rating in obj) {
      count += parseInt(obj[rating])
    }
    return count;
  }

  const calculatePercentage = (string) => {
    if (string === undefined) {
      return 0;
    }

    let value = parseInt(string);
    return ((value / reviewTotal) * 100);
  }

  const reviewTotal = parseReviewTotal(meta.ratings);

  return (
    <div className="reviews-flexBreakdownChild" data-testid="ratings-parent-div">
      <div className='average-rating-parent'>
        <h2>{getAverageRating(meta.ratings)}</h2>
        <div className='average-star-parent'>
          <Star ratings={getAverageRating(meta.ratings)}/>
        </div>
      </div>
      <div className='bars-container'>
        <div className='bar-container'>
          <div className='bar-label'>5 stars</div>
          <div className='bar-parent'>
            <div className='bar-child' name='5-stars'style={{ width: `${calculatePercentage(meta.ratings[5])}%` }}></div>
          </div>
        </div>
      </div>
      <div className='bars-container'>
        <div className='bar-container'>
          <div className='bar-label'>4 stars</div>
          <div className='bar-parent'>
            <div className='bar-child' name='5-stars'style={{ width: `${calculatePercentage(meta.ratings[4])}%` }}></div>
          </div>
        </div>
      </div>
      <div className='bars-container'>
        <div className='bar-container'>
          <div className='bar-label'>3 stars</div>
          <div className='bar-parent'>
            <div className='bar-child' name='5-stars'style={{ width: `${calculatePercentage(meta.ratings[3])}%` }}></div>
          </div>
        </div>
      </div>
      <div className='bars-container'>
        <div className='bar-container'>
          <div className='bar-label'>2 stars</div>
          <div className='bar-parent'>
            <div className='bar-child' name='5-stars'style={{ width: `${calculatePercentage(meta.ratings[2])}%` }}></div>
          </div>
        </div>
      </div>
      <div className='bars-container'>
        <div className='bar-container'>
          <div className='bar-label'>1 stars</div>
          <div className='bar-parent'>
            <div className='bar-child' name='5-stars'style={{ width: `${calculatePercentage(meta.ratings[1])}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}