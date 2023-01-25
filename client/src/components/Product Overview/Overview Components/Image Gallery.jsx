import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGallery (props) {

  // just need a default image here for now, we can default style one
  // its an array so props.styles[0].photos.url is our src for default 1

  // create a state for the current rendered big image
  const [currPhoto, setCurrPhoto] = useState('');

  // create two states one for the next image
  // one for the default image
  // default image will be passed down from the product overview
  //

  // create useEffect here to set current photo immediately to default
  useEffect ( () => {
    if (currPhoto === '' || props.default === true) {
      setCurrPhoto(props.style.photos[0].thumbnail_url);
    }
  })


  function updatePhoto (e) {
    // onclick function that updates the photo
    e.preventDefault();
    setCurrPhoto(props.style.photos[e.target.id].thumbnail_url);
  }

  return ([
    <img className='overview-gallery' src={currPhoto}></img>,
    <div className='overview-thumbnail'>
      {props.style.photos.map( (currPhotoObj, i) => {
      var test = i;
      return (
          <img key={i} onClick={updatePhoto} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
          )
      })}
    </div>
  ])

}

export default ImageGallery;