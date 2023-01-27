import React, { useState, useEffect } from 'react';

export default function RatingsBreakdown(props) {

  const getAverageRating = (ratings) => {
    var scoreTotal = ((ratings[5] * 5 ) + (ratings[4] * 4) + (ratings[3] * 3) + (ratings[2] * 2) + (ratings[1] * 1));
    var totalResponses = Number(ratings[5]) + Number(ratings[4]) + Number(ratings[3]) + Number(ratings[2]) + Number(ratings[1]);
    var averageRating = Math.round((scoreTotal / totalResponses) * 10) / 10;
    return averageRating;
  }

  return (
    <div className="reviews-flexBreakdownChild" data-testid="ratings-parent-div">
      <h2>{getAverageRating(props.meta.ratings)}</h2>
    </div>
  )
}