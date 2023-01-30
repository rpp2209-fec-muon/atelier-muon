import React, { useState, useEffect } from 'react';

function StyleSelector (props) {

  // take the array of different styles
  // create buttons that are cicles by mapping through them

  // create state to hold checkmark array

  console.log('should be array of booleans', props.check);

  return ([
    <h3> Style > {props.style.name}</h3>,
    <div className='overview-style'>
      {props.styles.map( (currStyle, i) => {
          if (props.check[i] === true) {
            return (
              <button onClick={props.update}  key={currStyle.style_id} className='overview-button'>
                <img alt={`${currStyle.style_id}`} className="overview-style-thumbnail" src={currStyle.photos[0].url}></img>
                <img className="overview-checkmark" src='data:image/png;base64,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'></img>
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