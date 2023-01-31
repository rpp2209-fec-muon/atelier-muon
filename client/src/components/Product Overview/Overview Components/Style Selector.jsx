import React, { useState, useEffect } from 'react';

function StyleSelector (props) {

  // take the array of different styles
  // create buttons that are cicles by mapping through them

  // create state to hold checkmark array

  return ([
    <h3 key={'style-heading'} > Style > {props.style.name}</h3>,
    <div key={'style-buttons'} className='overview-style'>
      {props.styles.map( (currStyle, i) => {
          if (props.check[i] === true) {
            return (
              <button onClick={props.update}  key={currStyle.style_id} className='overview-button'>
                <img alt={`${currStyle.style_id}`} className="overview-style-thumbnail" src={currStyle.photos[0].url}></img>
                <img className="overview-checkmark" src='https://i.imgur.com/Fxl95Rx.png'></img>
              </button>
            )
          } else {
            return (
              <button onClick={props.update}  key={currStyle.style_id} className='overview-button'>
                <img alt={`${currStyle.style_id}`} className="overview-style-thumbnail" src={currStyle.photos[0].url}></img>
              </button>
            )
          }
        }
      )}
    </div>
  ])
}

export default StyleSelector;