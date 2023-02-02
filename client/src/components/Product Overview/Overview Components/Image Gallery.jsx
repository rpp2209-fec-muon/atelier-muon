import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGallery (props) {

  const [click, setClick] = useState(false);

  function setFlag () {
    setClick(true)
  }

  function unsetFlag () {
    setClick(false)
  }

  if (!click) {
    return ([
      <div key={'main-photo'} data-testid="gallery-main">
        <img  className='overview-gallery' src={props.currPhoto}></img>
        <img onClick={setFlag} className='overview-expanded-image' src="https://www.svgrepo.com/show/121017/expand.svg"></img>

      </div>,
      <div data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail'>
        {props.style.photos.map( (currPhotoObj, i) => {
        var test = i;
        return (
            <img key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
            )
        })}
      </div>
    ])
  } else {
    return (
      <div>
        {click ? (
          <div className="fullscreen-container">
            <img src={props.currPhoto} className='fullscreen'></img>
            <img onClick={unsetFlag} className='overview-expanded-image-2' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
          </div>
        ) : (
          <img src={props.currPhoto} onClick={setFlag}></img>
        )}
        <div data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail'>
          {props.style.photos.map( (currPhotoObj, i) => {
          var test = i;
          return (
              <img key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
              )
          })}
        </div>
      </div>
    )
  }

}

export default ImageGallery;