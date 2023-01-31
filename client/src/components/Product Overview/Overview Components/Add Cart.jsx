import React, { useState, useEffect } from 'react';

function AddToCart (props) {

  if (props.skus.length) {
    return ([
      <select value={props.productSize} className='overview-cart' key={'select-drop-down'} onChange={props.update}>
        <option value='Select Size'> Select Size </option>
        {props.skus.map( (currUnit, i) => {
            return (
              <option key={i + currUnit.size} value={ JSON.stringify({quantity: currUnit.quantity, size: currUnit.size})}> {currUnit.size} </option>
            )
        })}
      </select>,
      <select className='overview-cart' key={'select-quantity'}>
        {props.quantity.map( (currValue, i) => {
          return (
            <option key={i+currValue} value={currValue+1}> {currValue+1} </option>
          )
        })}
      </select>,
      <button key={'add-cart-button'} className='overview-cart'> <div className='overview-cart-text'>Add To Cart</div> </button>,
      <button key={'outfit-star-button'} className='overview-cart'> <span className={`star fa fa-star`}></span> </button>
    ])
  } else {
    return ([
      <select className='overview-cart' key={'select-drop-down'} onChange={props.update}>
        <option value='Select Your Size'> OUT OF STOCK </option>
      </select>,
      <select className='overview-cart' key={'select-quantity'}>
      </select>,
      <button key={'add-cart-button'} className='overview-cart'> <div className='overview-cart-text'>Add To Cart</div> </button>,
      <button key={'outfit-star-button'} className='overview-cart'> <span className={`star fa fa-star`}></span> </button>
    ])
  }
}

export default AddToCart;