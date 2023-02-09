import React from 'react';

export default function AddOutfit(props) {
  return (
    <div className="rp-card" data-testid="rp-add" onClick={props.onClick}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/archive/0/06/20170115173609%21OOjs_UI_icon_add.svg" alt="Add" className="rp-card-addoutfit-img"></img>
      <div className="rp-card-addoutfit-text"> Add to Outfit </div>
    </div>
  )
}