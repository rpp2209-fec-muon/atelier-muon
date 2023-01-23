import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGallery (props) {

  // just need a default image here for now, we can default style one
  // its an array so props.styles[0].photos.url is our src for default 1
  console.log('images', props.styles);

  if(props.styles.length) {
    return (
      <img className='overview-gallery' src={props.styles[0].photos[0].thumbnail_url}></img>
    )
  } else {
    return (
      null
    )
  }
}

export default ImageGallery;