import React, { useState, useEffect } from 'react';
import Star from '../../Global/Star.jsx';
import Price from '../../Global/Price.jsx';

function ProductInfo (props) {

  var currProduct = props.product[0];

  function reviewScroll () {
    var element = document.getElementById('reviews-component')
    element.scrollIntoView();
  }

  if (currProduct) {
    return ([
      <div data-testid='overview-product-info' key={'overview-name-div'} className='overview-product-info-parent'>
        <div className='overview-product-info-star'>
          <Star ratings={props.star}/>
        </div>
        <u className='overview-product-info-reviews' onClick={reviewScroll}> See all {props.reviews} reviews...</u>
        <div className='overview-product-info-category'> {currProduct.category} </div>
        <h1 className='overview-product-info-name'> {currProduct.name} </h1>
        <h2 className='overview-product-info-price'><Price original_price={props.price.original} sale_price={props.price.sale}/></h2>
      </div>,
      <div data-testid='overview-slogan' key={'overview-slogal-description'} className='overview-product-info-sd'>
        <h3 className='overview-product-info-slogan'> {currProduct.slogan} </h3>
        <div className='overview-product-info-description'> {currProduct.description} </div>
        <div className='overview-product-info-feature-parent'>
          {currProduct.features.map( (currFeature, key) => {
            return (
              <p className='overview-product-info-feature' key={currFeature.feature}> <img alt='selected style' key={'overview-product-info-feature-checkmark'} className='overview-product-info-feature-checkmark' src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Check_mark_9x9.svg/800px-Check_mark_9x9.svg.png'></img>{currFeature.value + ' ' + currFeature.feature} </p>
            )
          })}
        </div>
      </div>
    ])
  } else {
    return null
  }

}

export default ProductInfo;