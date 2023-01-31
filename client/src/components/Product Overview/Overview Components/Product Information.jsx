import React, { useState, useEffect } from 'react';
import Star from '../../Global/Star.jsx';
import Price from '../../Global/Price.jsx';

function ProductInfo (props) {

  var currProduct = props.product[0];

  function reviewScroll () {
    var element = document.getElementById('reviews-component');
    element.scrollIntoView();
  }

  if (currProduct) {
    return ([
      <div key={'overview-name-div'} className='overview-name'>
        <Star ratings={props.star}/>
        <div className='overview-scroll-reviews' onClick={reviewScroll}> See all ... reviews...</div>
        <div className='overview-category'> {currProduct.category} </div>
        <h1> {currProduct.name} </h1>
        <h3><Price original_price={props.price.original} sale_price={props.price.sale}/></h3>
      </div>,
      <div key={'overview-slogal-description'} className='overview-slogan-description'>
        <h3> {currProduct.slogan} </h3>
        <div className='overview-description'> {currProduct.description} </div>
      </div>
    ])
  } else {
    return null
  }

}

export default ProductInfo;