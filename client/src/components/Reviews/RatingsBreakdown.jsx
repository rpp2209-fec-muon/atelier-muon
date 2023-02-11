import React, { useState, useEffect } from 'react';

export default function RatingsBreakdown({ meta, getAverageRating }) {

  return (
    <div className="reviews-flexBreakdownChild" data-testid="ratings-parent-div">
      <h2>{getAverageRating(meta.ratings)}</h2>
    </div>
  )
}