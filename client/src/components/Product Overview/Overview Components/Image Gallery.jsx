import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ImageGallery (props) {

  const [click, setClick] = useState(false);
  const ref = useRef(null);


  function setFlag () {
    setClick(true)
  }

  function unsetFlag () {
    setClick(false)
  }


  function scrollD (e) {
    e.preventDefault();
    ref.current.scrollTop += 40;
  }

  function scrollU (e) {
    e.preventDefault();
    ref.current.scrollTop -= 40;
  }


  if (!click && props.currPhotoIndex === 0) {
    return ([
      <div className='overview-gallery-parent' key={'main-photo'} data-testid="gallery-main">
        <img onClick={setFlag} className='overview-gallery' src={props.currPhoto}></img>
        <img onClick={setFlag} className='overview-expanded-image' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
        <div className='overview-next-right-div'>
          <span onClick={ (e) => {props.update(e); scrollD(e)}} id={props.currPhotoIndex} className='overview-next-right'></span>
        </div>

      </div>,
      <div className='overview-thumbnail-parent'>
        <span onClick={scrollU} className='overview-scroll-up'></span>
        <div ref={ref} data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail'>
          {props.style.photos.map( (currPhotoObj, i) => {
            if (i === props.currPhotoIndex) {
              return (
                <img style={{border: '2px solid rgba(255,255,255, 0.9)' }}key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                )
            } else {
              return (
                  <img key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                  )
            }
          })}
        </div>
        <span onClick={scrollD} className='overview-scroll-down'></span>
      </div>
    ])
  } else if (!click && props.currPhotoIndex === props.style.photos.length - 1) {
    return ([
      <div className='overview-gallery-parent'key={'main-photo'} data-testid="gallery-main">
        <img  className='overview-gallery' src={props.currPhoto}></img>
        <img onClick={setFlag} className='overview-expanded-image' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
        <div className='overview-next-left-div'>
          <span onClick={(e) => {props.update(e); scrollU(e)}} id={props.currPhotoIndex} className='overview-next-left'></span>
        </div>
      </div>,
      <div className='overview-thumbnail-parent'>
        <span onClick={scrollU} className='overview-scroll-up'></span>
        <div ref={ref} data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail'>
          {props.style.photos.map( (currPhotoObj, i) => {
            if (i === props.currPhotoIndex) {
              return (
                <img style={{border: '2px solid rgba(255,255,255, 0.9)' }}key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                )
            } else {
              return (
                  <img key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                  )
            }
          })}
        </div>
        <span onClick={scrollD} className='overview-scroll-down'></span>
      </div>
    ])
  } else if (!click && props.currPhotoIndex !== 0 && props.currPhotoIndex !== props.style.photos.length - 1) {
    return ([
      <div className='overview-gallery-parent'key={'main-photo'} data-testid="gallery-main">
        <img  className='overview-gallery' src={props.currPhoto}></img>
        <img onClick={setFlag} className='overview-expanded-image' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
        <div className='overview-next-left-div'>
          <span onClick={(e) => {props.update(e); scrollU(e)}} id={props.currPhotoIndex} className='overview-next-left'></span>
        </div>
        <div className='overview-next-right-div'>
          <span onClick={(e) => {props.update(e); scrollD(e)}} id={props.currPhotoIndex} className='overview-next-right'></span>
        </div>

      </div>,
      <div className='overview-thumbnail-parent'>
        <span onClick={scrollU} className='overview-scroll-up'></span>
        <div ref={ref} data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail'>
          {props.style.photos.map( (currPhotoObj, i) => {
            if (i === props.currPhotoIndex) {
              return (
                <img style={{border: '2px solid rgba(255,255,255, 0.9)' }}key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                )
            } else {
              return (
                  <img key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                  )
            }
          })}
        </div>
        <span onClick={scrollD} className='overview-scroll-down'></span>
      </div>
    ])
  } else {
    return (
      <div>
        {click ? (
          <div className="fullscreen-container">
            <img onClick={unsetFlag} src={props.currPhoto} className='fullscreen'></img>
            <img onClick={unsetFlag} className='overview-expanded-image-2' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
          </div>
        ) : (
          <img src={props.currPhoto} onClick={setFlag}></img>
        )}
        <div className='overview-thumbnail-parent'>
          <span className='overview-scroll-up'></span>
          <div data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail'>
            {props.style.photos.map( (currPhotoObj, i) => {
              if (i === props.currPhotoIndex) {
                return (
                  <img style={{border: '2px solid rgba(1, 1, 1, 1)' }}key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                  )
              } else {
                return (
                    <img key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                    )
              }
            })}
          </div>
          <span onClick={scrollD} className='overview-scroll-down'></span>
        </div>
      </div>
    )
  }

}

export default ImageGallery;