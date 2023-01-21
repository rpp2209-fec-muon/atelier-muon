import React, { useState, useEffect } from 'react';

function StyleSelector (props) {

  // take the array of different styles
  // create buttons that are cicles by mapping through them

  return ([

    <div className='overview-style'>
      <div> Select Your Style </div>
      {props.styles.map( (currStyle, i) => {
        return (
          <button key={currStyle.style_id} className='overview-button'> Style {i + 1}</button>
        )
      })}
    </div>
  ])
}

export default StyleSelector;