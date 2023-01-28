import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';

export default function NewReviewModal({ closeModal }) {

  return (
    <div className='reviews-modalOverlay'>
      <div className='reviews-modalContainer'>
        <StarRating />
        <p onClick={() => {closeModal()}}>X</p>
        <div className="reviews-modal-recommend-container">
          <p>Do you recommend this product?</p>
          <input type="radio" id="yes-radio" name="recommend" value="Yes"></input>
          <label>Yes</label>
          <input type="radio" id="no-radio" name="recommend" value="No"></input>
          <label>No</label>
        </div>

        <div className="reviews-modal-characteristics-container">
          <p></p>
        </div>
      </div>
    </div>
  )
}