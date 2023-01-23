import React, { useState, useEffect } from 'react';

function ProductInfo (props) {

  var currProduct = props.product[0];

  if (currProduct) {
    return ([
      <div className='overview-name'>
        <div> Star Rating Import</div>
        <div className='overview-category'> {currProduct.category} </div>
        <h1> {currProduct.name} </h1>
        <h3> {'$' + currProduct.default_price}</h3>
      </div>,
      <div className='overview-slogan-description'>
        <h3> {currProduct.slogan} </h3>
        <div className='overview-description'> {currProduct.description} </div>
      </div>
    ])
  } else {
    return null
  }

}

export default ProductInfo;