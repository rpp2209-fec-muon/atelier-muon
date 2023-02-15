import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function ImageGallery (props) {

  const [click, setClick] = useState(false);
  const [mousePos, setMousePos] = useState({});
  const [zoomStyle, setZoomStyle] = useState({});
  const [zoomed, setZoom] = useState(false);
  const ref = useRef(null);

  useEffect( () => {
    if (props.expanded) {
      setClick(true);
    }
    const handleMouseMove = (event) => {
      setMousePos({ x: event.pageX, y: event.pageY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  })


  function setFlag () {
    setClick(true)
  }

  function unsetFlag () {
      setClick(false);
  }


  function scrollD (e) {
    e.preventDefault();
    if (props.expanded) {
      ref.current.scrollTop += 30;
    } else {
      ref.current.scrollTop += 50;
    }
  }

  function scrollU (e) {
    e.preventDefault();
    if (props.expanded) {
      ref.current.scrollTop -= 30;
    } else {
      ref.current.scrollTop -= 50;
    }
  }

  function zoomPosition (e) {
    e.preventDefault();

    console.log('alt', e.target.alt);

    if (e.target.alt === 'true') {
      var imgStyle = {
        cursor: 'crosshair',
        width: '100%',
        position: 'relative',
      }
      setZoom(false);
      setZoomStyle(imgStyle);
    } else {
      // there are four possible regions
      var imgStyle = {
        cursor: 'zoom-out',
        width: '100%',
        transform: 'scale(2.5)',
        position: 'relative',
      }

      var imageBounds = e.target.getBoundingClientRect();
      var xBound = Math.floor(imageBounds.x);
      var yBound = Math.floor(imageBounds.y);

      if (!zoomed) {
        if ((mousePos.x - xBound >= 180) && (mousePos.y - yBound >= 240)
        && (mousePos.x - xBound <= 270) && (mousePos.y - yBound <= 360)) {
          setZoom(true);
          setZoomStyle(imgStyle);
        } else {
          // region 1 is mousePos.x > 547 < 772 mousePos.y > 242 < 542
          if ((mousePos.x - xBound < 225) && (mousePos.y - yBound <  300)) {
            imgStyle.left = '50%'
            imgStyle.top = '50%'
            setZoom(true);
            setZoomStyle(imgStyle);
            console.log('region1', mousePos, e.target.getBoundingClientRect())
          }
          // region 2 is mousePos.x > 772 < 997 mousePos.y > 242 < 542
          if ((mousePos.x - xBound > 225) && (mousePos.y - yBound < 300 )) {
            imgStyle.right = '50%'
            imgStyle.top = '50%'
            setZoom(true);
            setZoomStyle(imgStyle);
            console.log('region2', mousePos, e.target.getBoundingClientRect())
          }
          // region 3 is mousePos.x > 547 < 772 mousePos.y > 542 < 842
          if ((mousePos.x - xBound < 225) && (mousePos.y - yBound > 300)) {
            imgStyle.left = '50%'
            imgStyle.bottom = '50%'
            setZoom(true);
            setZoomStyle(imgStyle);
            console.log('region3', mousePos, e.target.getBoundingClientRect())
          }
          // region 4 is mousePos.x > 772 < 997 mousePos.y > 242 < 542
          if ((mousePos.x - xBound > 225) && (mousePos.y - yBound > 300)) {
            imgStyle.right = '50%'
            imgStyle.bottom = '50%'
            setZoom(true);
            setZoomStyle(imgStyle);
            console.log('region4', mousePos, e.target.getBoundingClientRect())
          }
        }
      } else {
        setZoom(false);
        setZoomStyle({
          cursor: 'zoom-out',
          width: '100%',
        })
      }
    }
  }

  if (!click && props.currPhotoIndex === 0) {
    return ([
      <div className='overview-gallery-parent' key={'main-photo'} data-testid="gallery-main">
        <div key={'overview-gallery-main-image-parent'} className='overview-gallery-main-image-parent'>
          <img alt='main image' key={'overview-gallery-main-image'} onClick={(e) => {setFlag(); props.setView(e)}} className='overview-gallery-main-image' src={props.currPhoto}></img>
        </div>
        <img alt='expanded image' key={'overview-expanded-image'} onClick={ (e) => {setFlag(); props.setView(e)}} className='overview-expanded-image' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
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
                <img style={{height: '49px', width: '49px', border: '2px solid rgba(255,255,255, 0.9)' }} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.thumbnail_url} id={i}></img>
                )
            } else {
              return (
                  <img style={{height: '49px', width: '49px'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.thumbnail_url} id={i}></img>
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
          <img alt='main image' key={'overview-gallery-main-image'} onClick={(e) => {setFlag(); props.setView(e)}} className='overview-gallery-main-image' src={props.currPhoto}></img>
        </div>
        <img alt='expanded image' key={'overview-expanded-image'} onClick={(e) => {setFlag(); props.setView(e)}} className='overview-expanded-image' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
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
                <img style={{height: '49px', width: '49px', border: '2px solid rgba(255,255,255, 0.9)' }}key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.thumbnail_url} id={i}></img>
                )
            } else {
              return (
                  <img style={{height: '49px', width: '49px'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.thumbnail_url} id={i}></img>
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
          <img alt='main image' key={'overview-gallery-main-image'} onClick={(e) => {setFlag(); props.setView(e)}} className='overview-gallery-main-image' src={props.currPhoto}></img>
        </div>
        <img alt='expanded image' key={'overview-expanded-image'} onClick={(e) => {setFlag(); props.setView(e)}} className='overview-expanded-image' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
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
                <img style={{height: '49px', width: '49px', border: '2px solid rgba(255,255,255, 0.9)' }}key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.thumbnail_url} id={i}></img>
                )
            } else {
              return (
                  <img style={{height: '49px', width: '49px'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos' src={currPhotoObj.url} id={i}></img>
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
                <div key={'overview-image-gallery-fullscreen-image-parent'} className='overview-image-gallery-fullscreen-image-parent'>
                  <img style={zoomStyle} key={'overview-image-gallery-fullscreen-image'}  src={props.currPhoto} className='overview-image-gallery-fullscreen-image' alt={`${zoomed}`} onClick={zoomPosition}></img>
                </div>
                <img alt='expand button' key={'overview-expanded-image-2'} onClick={(e) => {unsetFlag(); props.setView(e)}} className='overview-expanded-image-2' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
                <div key={'overview-next-right-div-expanded'} className='overview-next-right-div-expanded'>
                  <span key={'overview-next-right'} onClick={(e) => {props.update(e); scrollD(e)}} id={props.currPhotoIndex} className='overview-next-right'></span>
                </div>
              </div>
            ) : (
              <img alt='expanded image' key={'overview-image-gallery-expanded-image'} src={props.currPhoto} onClick={setFlag}></img>
            )}
            <div key={'overview-thumbnail-parent'} className='overview-thumbnail-parent-expanded'>
              <div key={'overview-thumbnail-scroll-up'} className='overview-thumbnail-scroll'>
                <span key={'overview-thumbnail-scroll-up-icon'} className='overview-thumbnail-scroll-up-icon' onClick={scrollU}></span>
              </div>
              <div ref={ref} data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail-expanded'>
                {props.style.photos.map( (currPhotoObj, i) => {
                  if (i === props.currPhotoIndex) {
                    return (
                      <img style={{height: '49px', width: '49px', border: '1.5px solid rgba(255,255,255, 0.9)'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos-expanded' src={currPhotoObj.thumbnail_url} id={i}></img>
                      )
                  } else {
                    return (
                        <img style={{height: '49px', width: '49px'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos-expanded' src={currPhotoObj.thumbnail_url} id={i}></img>
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
                <div key={'overview-image-gallery-fullscreen-image-parent'} className='overview-image-gallery-fullscreen-image-parent'>
                  <img style={zoomStyle} alt={`${zoomed}`} key={'overview-image-gallery-fullscreen-image'}  src={props.currPhoto} className='overview-image-gallery-fullscreen-image'></img>
                </div>
                  <img alt='expand button' key={'overview-expanded-image-2'} onClick={(e) => {unsetFlag(); props.setView(e)}} className='overview-expanded-image-2' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
                  <div key={'overview-last-next-left-div-expanded'} className='overview-last-next-left-div-expanded'>
                    <span key={'overview-last-next-left'} onClick={(e) => {props.update(e); scrollU(e)}} id={props.currPhotoIndex} className='overview-next-left'></span>
                  </div>
                </div>
              ) : (
                <img alt='expanded image' key={'overview-image-gallery-expanded-image'} src={props.currPhoto} onClick={setFlag}></img>
              )}
              <div key={'overview-thumbnail-parent'} className='overview-thumbnail-parent-expanded'>
                <div key={'overview-thumbnail-scroll-up'} className='overview-thumbnail-scroll'>
                  <span key={'overview-thumbnail-scroll-up-icon'} className='overview-thumbnail-scroll-up-icon' onClick={scrollU}></span>
                </div>
                <div ref={ref} data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail-expanded'>
                  {props.style.photos.map( (currPhotoObj, i) => {
                    if (i === props.currPhotoIndex) {
                      return (
                        <img style={{height: '49px', width: '49px', border: '1.5px solid rgba(255,255,255, 0.9)'}}key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos-expanded' src={currPhotoObj.thumbnail_url} id={i}></img>
                        )
                    } else {
                      return (
                          <img style={{height: '49px', width: '49px'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos-expanded' src={currPhotoObj.thumbnail_url} id={i}></img>
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
                  <div key={'overview-image-gallery-fullscreen-image-parent'} className='overview-image-gallery-fullscreen-image-parent'>
                    <img style={zoomStyle} key={'overview-image-gallery-fullscreen-image'} alt={`${zoomed}`} src={props.currPhoto} className='overview-image-gallery-fullscreen-image'></img>
                  </div>
                  <img alt='expand button' key={'overview-expanded-image-2'} onClick={(e) => {unsetFlag(); props.setView(e)}} className='overview-expanded-image-2' src="https://www.svgrepo.com/show/121017/expand.svg"></img>
                  <div key={'overview-next-right-div-expanded'} className='overview-next-right-div-expanded'>
                    <span key={'overview-next-right'} onClick={(e) => {props.update(e); scrollD(e)}} id={props.currPhotoIndex} className='overview-next-right'></span>
                  </div>
                </div>
              ) : (
                <img alt='expanded image' key={'overview-image-gallery-expanded-image'} src={props.currPhoto} onClick={setFlag}></img>
              )}
              <div key={'overview-thumbnail-parent'} className='overview-thumbnail-parent-expanded'>
                <div key={'overview-thumbnail-scroll-up'} className='overview-thumbnail-scroll'>
                  <span key={'overview-thumbnail-scroll-up-icon'} className='overview-thumbnail-scroll-up-icon' onClick={scrollU}></span>
                </div>
                <div ref={ref} data-testid="gallery-thumbnails" key={'overview-thumbnail-div'} className='overview-thumbnail-expanded'>
                  {props.style.photos.map( (currPhotoObj, i) => {
                    if (i === props.currPhotoIndex) {
                      return (
                        <img style={{height: '49px', width: '49px', border: '1.5px solid rgba(255,255,255, 0.9)'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos-expanded' src={currPhotoObj.thumbnail_url} id={i}></img>
                        )
                    } else {
                      return (
                          <img style={{height: '49px', width: '49px'}} key={'overview' + i} onClick={props.update} className='overview-thumbnail-photos-expanded' src={currPhotoObj.thumbnail_url} id={i}></img>
                          )
                    }
                  })}
                </div>
                <div key={'overview-next-left-div-expanded'} className='overview-next-left-div-expanded'>
                    <span key={'overview-next-left'} onClick={(e) => {props.update(e); scrollU(e)}} id={props.currPhotoIndex} className='overview-next-left'></span>
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