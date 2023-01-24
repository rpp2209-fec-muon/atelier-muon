// <!-- This is just a placeholder so git commits the basic folder structure! Feel free to delete me when you start adding files to this folder. -->
import React, {useEffect, useState } from 'react';
import ImageGallery from './Overview Components/Image Gallery.jsx';
import ProductInfo from './Overview Components/Product Information.jsx';
import StyleSelector from './Overview Components/Style Selector.jsx';
import AddToCart from './Overview Components/Add Cart.jsx';
import axios from 'axios';

function ProductOverview (props) {

  // create state to hold current view
  const [exampleProduct, setExampleProduct] = useState([])
  const [productStyles, setProductStyles] = useState([])
  const [currentStyle, setCurrentStyle] = useState([])

  // create style image state to be updated with onclick function for next
  // style image

  useEffect( () => {
    if (exampleProduct.length === 0 && productStyles.length === 0) {
      getStyles()
      getProduct()
    }
  })

  function getStyles () {
    axios
    .get('/products', { params: { type: '/styles', product_id: props.product, params: {} }})
      .then((data) => {
        // data.data.results gives me array of styles that contain photos
        console.log('style data', data.data.results)
        setProductStyles(data.data.results);
        setCurrentStyle(data.data.results[0])
      })
      .catch(err => console.log(err));
  }

  function getProduct () {
    axios
    .get('/products', { params: { type: '', product_id: props.product, params: {} }})
    .then((data) => {
      console.log('GET Request Successful');
      var product = []
      product.push(data.data)
      setExampleProduct(product);
    })
    .catch(err => console.log(err));
  }

  if (productStyles.length && currentStyle.photos.length) {
    return ([
      <div className='overview-product-overview'>
        <ImageGallery style={currentStyle} id={props.product}/>
        <ProductInfo product={exampleProduct}/>
        <StyleSelector styles={productStyles}/>
        <AddToCart product={exampleProduct}/>
      </div>
    ])
  } else {
    return null
  }
}

export default ProductOverview;