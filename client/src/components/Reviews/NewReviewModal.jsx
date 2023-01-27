import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';

export default function NewReviewModal() {

  return (
    <div className='modalOverlay'>
      <div className='modalContainer'>
        <StarRating />
      </div>
    </div>
  )
}