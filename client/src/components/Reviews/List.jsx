import React, { useState, useEffect } from 'react';
import Tile from './Tile.jsx';

export default function List(props) {

  console.log('list', props.list);

  return (
    <div className="reviews-flexListChild" data-testid="list-parent-div">
    {props.list.map((item) => {
      return <Tile key={item.review_id} review={item}/>
    })}
    </div>
  )
}