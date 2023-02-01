import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGallery (props) {

  return ([
    <div key={'main-photo'} data-testid="gallery-main"><img  className='overview-gallery' src={props.currPhoto}></img></div>,
    <div data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail'>
      {props.style.photos.map( (currPhotoObj, i) => {
      var test = i;
      return (
          <img key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
          )
      })}
    </div>
  ])

}

export default ImageGallery;