import React, { useState, useEffect } from 'react';

export default function Photos({ photos }) {

  return (
    <div className='tile-child review-tile-photos-container'>
      {photos.map((photo) => {
        return (
          <img alt='user submitted photo' className='review-tile-photo-instance' key={photo.id} src={photo.url} width="100" height="100" onError={(event) => {
            event.target.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png';
            event.onerror = null;
          }}></img>
        )
      })}
    </div>
  )
}