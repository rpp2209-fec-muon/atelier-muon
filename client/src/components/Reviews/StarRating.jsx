import React, { useState, useEffect } from 'react';

export default function StarRating () {
  const [rating, setRating] = useState(0);


  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "on star-button" : "off star-button"}
            onClick={() => setRating(index)}>
              <span className="new-review-star">&#9733;</span>
            </button>
        )
      })}
    </div>
  )
}