import React, { useState, useEffect } from 'react';

export default function Tile(props) {

  var review = props.review;

  return (
    <div>
      <div><b>{review.summary}</b></div>
      <div>{review.body}</div>
      {review.recommend &&
        <div><i>I recommend this product</i></div>
      }
    </div>
  )
}