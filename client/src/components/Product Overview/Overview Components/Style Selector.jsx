import React, { useState, useEffect } from 'react';

function StyleSelector (props) {

  // take the array of different styles
  // create buttons that are cicles by mapping through them

  // create state to hold checkmark array

  return ([
    <div key={'overview-style-selector-parent'} className='overview-style-selector-parent'>
      <h3 className='overview-style-selector-display' data-testid='overview-style-heading' key={'style-heading'} > Style > {props.style.name}</h3>
      <div data-testid='overview-mapped-styles' key={'style-buttons'} className='overview-style-selector-thumbnail-parent'>
        {props.styles.map( (currStyle, i) => {
            if (props.check[i] === true) {
              return (
                <button className='overview-style-selector-thumbnail-button' onClick={props.update}  key={currStyle.style_id}>
                  <img key={"overview-style-selector-thumbnail" + i} alt={`${currStyle.style_id}`} className="overview-style-selector-thumbnail" src={currStyle.photos[0].thumbnail_url}></img>
                  <img key={"overview-checkmark" + i} className="overview-checkmark" src='https://i.imgur.com/Fxl95Rx.png'></img>
                </button>
              )
            } else {
              return (
                <button className='overview-style-selector-thumbnail-button' onClick={props.update}  key={currStyle.style_id} >
                  <img key={"overview-style-selector-thumbnail" + i} alt={`${currStyle.style_id}`} className="overview-style-selector-thumbnail" src={currStyle.photos[0].thumbnail_url}></img>
                </button>
              )
            }
          }
        )}
      </div>
    </div>
  ])
}

export default StyleSelector;