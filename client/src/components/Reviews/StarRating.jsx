import React, { useState, useEffect } from 'react';

export default function StarRating ({ rating, handleChange }) {

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <div className="star-parent" key={"radio-parent" + index}>
            <input type="radio" id={"rating" + index} name="rating" value={index} key={index} onClick={() => {handleChange(index)}} required></input>
            <label htmlFor={"rating" + index} key={"label" + index}>{index}&#9733;</label>
          </div>
        )
      })}
    </div>
  )
}