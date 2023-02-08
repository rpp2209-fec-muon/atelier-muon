import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ImageGallery (props) {

  const [click, setClick] = useState(false);
  const [zoom, setZoom] = useState({zoom: 1});
  const [expand, setExpand] = useState({  width: '25px', height: '25px', position: 'relative', right: '37px', bottom: '15px'});
  const ref = useRef(null);


  function setFlag () {
    setClick(true)
  }

  function unsetFlag () {
    if (zoom.zoom > 1) {
      setClick(false)
      setZoom({zoom:1})
    } else {
      setClick(false);
    }
  }

  function zoomIn (e) {
    e.preventDefault()
    if (zoom.zoom === 1) {
      setZoom({zoom: 2.5, position: 'relative', right: '32.5px', cursor: 'zoom-out'});
      setExpand({left: '95%', bottom: '60px'})
    } else {
      setZoom({zoom: 1});
      setExpand({  width: '25px', height: '25px', position: 'relative', right: '37px', bottom: '15px'})
    }
  }


  function scrollD (e) {
    e.preventDefault();
    ref.current.scrollTop += 50;
  }

  function scrollU (e) {
    e.preventDefault();
    ref.current.scrollTop -= 50;
  }


  if (!click && props.currPhotoIndex === 0) {
    return ([
      <div className='overview-gallery-parent' key={'main-photo'} data-testid="gallery-main">
        <div key={'overview-gallery-main-image-parent'} className='overview-gallery-main-image-parent'>
          <img key={'overview-gallery-main-image'} onClick={setFlag} className='overview-gallery-main-image' src={props.currPhoto}></img>
        </div>
        <img key={'overview-expanded-image'} onClick={ () => {setFlag(); props.expand()}} className='overview-expanded-image' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
        <div key={'overview-first-next-right-div'} className='overview-first-next-right-div'>
          <span key={'overview-next-right'} onClick={ (e) => {props.update(e); scrollD(e)}} id={props.currPhotoIndex} className='overview-next-right'></span>
        </div>
      </div>,
      <div key={'overview-thumbnail-parent'} className='overview-thumbnail-parent'>
        <div key={'overview-thumbnail-scroll-up'} className='overview-thumbnail-scroll'>
          <span key={'overview-thumbnail-scroll-up-icon'} className='overview-thumbnail-scroll-up-icon' onClick={scrollU}></span>
        </div>
        <div ref={ref} data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail'>
          {props.style.photos.map( (currPhotoObj, i) => {
            if (i === props.currPhotoIndex) {
              return (
                <img style={{border: '2px solid rgba(255,255,255, 0.9)' }} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                )
            } else {
              return (
                  <img key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                  )
            }
          })}
        </div>
        <div key={'overview-thumbnail-scroll-down'} className='overview-thumbnail-scroll'>
          <span onClick={scrollD} className='overview-thumbnail-scroll-down-icon' key={'overview-thumbnail-scroll-down-icon'} ></span>
        </div>
      </div>
    ])
  } else if (!click && props.currPhotoIndex === props.style.photos.length - 1) {
    return ([
      <div className='overview-gallery-parent' key={'main-photo'} data-testid="gallery-main">
        <div key={'overview-gallery-main-image-parent'} className='overview-gallery-main-image-parent'>
          <img key={'overview-gallery-main-image'} onClick={setFlag} className='overview-gallery-main-image' src={props.currPhoto}></img>
        </div>
        <img key={'overview-expanded-image'} onClick={() => {setFlag(); props.expand()}} className='overview-expanded-image' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
        <div key={'overview-next-left-div'} className='overview-next-left-div'>
          <span key={'overview-next-left'} onClick={(e) => {props.update(e); scrollU(e)}} id={props.currPhotoIndex} className='overview-next-left'></span>
        </div>
      </div>,
      <div key={'overview-thumbnail-parent'} className='overview-thumbnail-parent'>
        <div key={'overview-thumbnail-scroll-up'} className='overview-thumbnail-scroll'>
          <span key={'overview-thumbnail-scroll-up-icon'} className='overview-thumbnail-scroll-up-icon' onClick={scrollU}></span>
        </div>
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
        <div key={'overview-thumbnail-scroll-down'} className='overview-thumbnail-scroll'>
          <span onClick={scrollD} className='overview-thumbnail-scroll-down-icon' key={'overview-thumbnail-scroll-down-icon'} ></span>
        </div>
      </div>
    ])
  } else if (!click && props.currPhotoIndex !== 0 && props.currPhotoIndex !== props.style.photos.length - 1) {
    return ([
      <div className='overview-gallery-parent' key={'main-photo'} data-testid="gallery-main">
        <div key={'overview-gallery-main-image-parent'} className='overview-gallery-main-image-parent'>
          <img key={'overview-gallery-main-image'} onClick={setFlag} className='overview-gallery-main-image' src={props.currPhoto}></img>
        </div>
        <img key={'overview-expanded-image'} onClick={() => {setFlag(); props.expand()}} className='overview-expanded-image' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
        <div key={'overview-next-left-div'} className='overview-next-left-div'>
          <span key={'overview-next-left'} onClick={(e) => {props.update(e); scrollU(e)}} id={props.currPhotoIndex} className='overview-next-left'></span>
        </div>
        <div key={'overview-next-right-div'} className='overview-next-right-div'>
          <span key={'overview-next-right'} onClick={(e) => {props.update(e); scrollD(e)}} id={props.currPhotoIndex} className='overview-next-right'></span>
        </div>
      </div>,
      <div key={'overview-thumbnail-parent'} className='overview-thumbnail-parent'>
        <div key={'overview-thumbnail-scroll-up'} className='overview-thumbnail-scroll'>
          <span key={'overview-thumbnail-scroll-up-icon'} className='overview-thumbnail-scroll-up-icon' onClick={scrollU}></span>
        </div>
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
        <div key={'overview-thumbnail-scroll-down'} className='overview-thumbnail-scroll'>
          <span onClick={scrollD} className='overview-thumbnail-scroll-down-icon' key={'overview-thumbnail-scroll-down-icon'} ></span>
        </div>
      </div>
    ])
  } else {
      if (click && props.currPhotoIndex === 0) {
        return (
          <div>
            {click ? (
              <div key={"overview-image-gallery-fullscreen-container"} className="overview-image-gallery-fullscreen-container">
                <img key={'overview-image-gallery-fullscreen-image'} style={zoom} onClick={zoomIn} src={props.currPhoto} className='overview-image-gallery-fullscreen-image'></img>
                <img key={'overview-expanded-image-2'} style={expand} onClick={() => {unsetFlag(); props.expand()}} className='overview-expanded-image-2' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
                <div key={'overview-first-next-right-div'} style={{left: '67%', top: '40%'}} className='overview-first-next-right-div'>
                  <span key={'overview-next-right'} onClick={(e) => {props.update(e);}} id={props.currPhotoIndex} className='overview-next-right'></span>
                </div>
              </div>
            ) : (
              <img key={'overview-image-gallery-expanded-image'} src={props.currPhoto} onClick={setFlag}></img>
            )}
            <div key={'overview-thumbnail-parent'} className='overview-thumbnail-parent'>
              <div key={'overview-thumbnail-scroll-up'} className='overview-thumbnail-scroll'>
                <span key={'overview-thumbnail-scroll-up-icon'} className='overview-thumbnail-scroll-up-icon' onClick={scrollU}></span>
              </div>
              <div data-testid="gallery-thumbnails" style={{width: '15px', height: '110px', marginLeft: '10px'}} key={'overview-thumbnail-div'} className='overview-thumbnail'>
                {props.style.photos.map( (currPhotoObj, i) => {
                  if (i === props.currPhotoIndex) {
                    return (
                      <img style={{border: '1.5px solid rgba(255,255,255, 0.9)', height: '10px', width: '10px'}}key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                      )
                  } else {
                    return (
                        <img style={{height: '10px', width: '10px'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                        )
                  }
                })}
              </div>
              <div key={'overview-thumbnail-scroll-down'} className='overview-thumbnail-scroll'>
                <span onClick={scrollD} className='overview-thumbnail-scroll-down-icon' key={'overview-thumbnail-scroll-down-icon'} ></span>
              </div>
            </div>
          </div>
        )
      } else if (click && props.currPhotoIndex === props.style.photos.length - 1) {
          return (
            <div>
              {click ? (
                <div key={"overview-image-gallery-fullscreen-container"} className="overview-image-gallery-fullscreen-container">
                  <img key={'overview-image-gallery-fullscreen-image'} style={zoom} onClick={zoomIn} src={props.currPhoto} className='overview-image-gallery-fullscreen-image'></img>
                  <img key={'overview-expanded-image-2'} style={expand} onClick={() => {unsetFlag(); props.expand()}} className='overview-expanded-image-2' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
                  <div key={'overview-first-next-right-div'} style={{left: '67%', top: '40%'}} className='overview-first-next-right-div'>
                    <span key={'overview-next-right'} onClick={(e) => {props.update(e);}} id={props.currPhotoIndex} className='overview-next-right'></span>
                  </div>
                </div>
              ) : (
                <img key={'overview-image-gallery-expanded-image'} src={props.currPhoto} onClick={setFlag}></img>
              )}
              <div key={'overview-thumbnail-parent'} className='overview-thumbnail-parent'>
                <span key={'overview-thumbnail-scroll-up'} className='overview-thumbnail-scroll-up'></span>
                <div data-testid="gallery-thumbnails" style={{width: '15px', height: '110px', marginLeft: '10px'}} key={'overview-thumbnail-div'} className='overview-thumbnail'>
                  {props.style.photos.map( (currPhotoObj, i) => {
                    if (i === props.currPhotoIndex) {
                      return (
                        <img style={{border: '1.5px solid rgba(255,255,255, 0.9)', height: '10px', width: '10px'}}key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                        )
                    } else {
                      return (
                          <img style={{height: '10px', width: '10px'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                          )
                    }
                  })}
                </div>
                <div key={'overview-thumbnail-scroll-down'} className='overview-thumbnail-scroll'>
                  <span key={'overview-thumbnail-scroll-down-icon'} onClick={scrollD} className='overview-thumbnail-scroll-down-icon'></span>
                </div>
              </div>
            </div>
          )
      } else if (click && props.currPhotoIndex !== 0 && props.currPhotoIndex !== props.style.photos.length - 1) {
          return (
            <div>
              {click ? (
                <div key={"overview-image-gallery-fullscreen-container"} className="overview-image-gallery-fullscreen-container">
                  <img key={'overview-image-gallery-fullscreen-image'} style={zoom} onClick={zoomIn} src={props.currPhoto} className='overview-image-gallery-fullscreen-image'></img>
                  <img key={'overview-expanded-image-2'} style={expand} onClick={() => {unsetFlag(); props.expand()}} className='overview-expanded-image-2' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
                  <div key={'overview-first-next-right-div'} style={{left: '67%', top: '40%'}} className='overview-first-next-right-div'>
                    <span key={'overview-next-right'} onClick={(e) => {props.update(e);}} id={props.currPhotoIndex} className='overview-next-right'></span>
                  </div>
                </div>
              ) : (
                <img key={'overview-image-gallery-expanded-image'} src={props.currPhoto} onClick={setFlag}></img>
              )}
              <div key={'overview-thumbnail-parent'} className='overview-thumbnail-parent'>
                <span key={'overview-thumbnail-scroll-up'} className='overview-thumbnail-scroll-up'></span>
                <div data-testid="gallery-thumbnails" style={{width: '15px', height: '110px', marginLeft: '10px'}} key={'overview-thumbnail-div'} className='overview-thumbnail'>
                  {props.style.photos.map( (currPhotoObj, i) => {
                    if (i === props.currPhotoIndex) {
                      return (
                        <img style={{border: '1.5px solid rgba(255,255,255, 0.9)', height: '10px', width: '10px'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                        )
                    } else {
                      return (
                          <img style={{height: '10px', width: '10px'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
                          )
                    }
                  })}
                </div>
                <div key={'overview-thumbnail-scroll-down'} className='overview-thumbnail-scroll'>
                  <span key={'overview-thumbnail-scroll-down-icon'} onClick={scrollD} className='overview-thumbnail-scroll-down-icon'></span>
                </div>
              </div>
            </div>
          )
      }

    }
}

export default ImageGallery;