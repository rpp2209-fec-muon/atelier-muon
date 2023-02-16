import React, { useState, useEffect } from 'react';

export default function RatingsBreakdown({ meta, getAverageRating }) {

  return (
    <div className="reviews-flexBreakdownChild" data-testid="ratings-parent-div">
      <h2>{getAverageRating(meta.ratings)}</h2>
      <div className='bars-container'>
        <div className='5-container' style={{ height: 24, width: '25%' }}>
          <div className='5-child' style={{ height: 24, width: '25%' }}></div>
        </div>
        <div className='4-container' style={{ height: 24, width: '25%' }}>
          <div className='4-child' style={{ height: 24, width: '25%' }}></div>
        </div>
        <div className='3-container' style={{ height: 24, width: '25%' }}>
          <div className='3-child' style={{ height: 24, width: '25%' }}></div>
        </div>
        <div className='2-container' style={{ height: 24, width: '25%' }}>
          <div className='2-child' style={{ height: 24, width: '25%' }}></div>
        </div>
        <div className='1-container' style={{ height: 24, width: '25%' }}>
          <div className='1-child' style={{ height: 24, width: '25%' }}></div>
        </div>
      </div>
    </div>
  )
}