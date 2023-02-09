import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddToCart (props) {

  function addToCart () {
    if (props.chosenSize && props.chosenQuantity) {
      // props.chosenSize, props.chosenQuantity gives us size/quant
      // cart api interation
      console.log('what is our skus', props.chosenSKU);
      axios
      .post('/cart', {sku_id: props.chosenSKU, count: parseInt(props.chosenQuantity)})
      .then((data) => {
        console.log(data);
      })
      .catch(err => console.log(err));
    }
  }

  if (props.skus.length) {
    return ([
      <div key={'overview-cart-parent'} className='overview-cart-parent'>
        <div key={'overview-cart-size-quantity'} className='overview-cart-size-quantity'>
          <select className='overview-cart-size' data-testid='overview-cart-select1' value={props.chosenSize} key={'select-drop-down'} onChange={props.update}>
            <option value='Select Size'> Select Size </option>
            {props.skus.map( (currUnit, i) => {
                return (
                  <option key={i + currUnit.size} value={ JSON.stringify({quantity: currUnit.quantity, size: currUnit.size, sku_id: currUnit.sku_id})}> {currUnit.size} </option>
                )
            })}
          </select>
          <select className='overview-cart-quantity' data-testid='overview-cart-select2' value={props.chosenQuantity} key={'select-quantity'} onChange={props.update2}>
            <option key={'-'} value='-'> - </option>
            {props.quantity.map( (currValue, i) => {
              return (
                <option key={currValue} value={currValue.toString()}> {currValue} </option>
              )
            })}
          </select>
        </div>
        <div key={'overview-cart-checkout-outfit'} className='overview-cart-checkout-outfit'>
          <button className='overview-cart-checkout' onClick={addToCart} key={'add-cart-button'} > <div className='overview-cart-checkout-text'>Add To Cart</div> </button>
          <button className='overview-cart-outfit-star' data-testid='overview-cart-button' key={'outfit-star-button'}> <span key={`star fa fa-star`} className={`star fa fa-star`}></span> </button>
        </div>
      </div>
    ])
  } else {
    return ([
      <div key={'overview-cart-parent'} className='overview-cart-parent'>
        <div key={'overview-cart-size-quantity'} className='overview-cart-size-quantity'>
          < select className='overview-cart-size' data-testid='overview-cart-select3' key={'select-drop-down'} onChange={props.update}>
            <option key={'OOS'} value='Select Your Size'> OUT OF STOCK </option>
          </select>
        </div>
        <div key={'overview-cart-checkout-outfit'} className='overview-cart-checkout-outfit'>
          <select className='overview-cart-quantity' data-testid='overview-cart-select4' key={'select-quantity'}></select>
          <button className='overview-cart-outfit-star' data-testid='overview-cart-button' key={'outfit-star-button'}> <span key={`star fa fa-star`} className={`star fa fa-star`}></span> </button>
        </div>
      </div>
    ])
  }
}

export default AddToCart;