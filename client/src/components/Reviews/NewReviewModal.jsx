import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';

export default function NewReviewModal() {

  return (
    <div className='reviews-modalOverlay'>
      <div className='reviews-modalContainer'>
        <StarRating />
      </div>
    </div>
  )
}