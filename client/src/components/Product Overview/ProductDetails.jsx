// <!-- This is just a placeholder so git commits the basic folder structure! Feel free to delete me when you start adding files to this folder. -->
import React, {useEffect, useState } from 'react';
import ImageGallery from './Overview Components/Image Gallery.jsx';
import ProductInfo from './Overview Components/Product Information.jsx';
import StyleSelector from './Overview Components/Style Selector.jsx';
import AddToCart from './Overview Components/Add Cart.jsx';
import axios from 'axios';

function ProductDetailsPage (props) {

  // create state to hold current view
  const [exampleProduct, setExampleProduct] = useState([])

  useEffect( () => {
    if (exampleProduct.length === 0) {
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
  })


  return ([
    <ImageGallery product={exampleProduct} id={props.product}/>,
    <ProductInfo product={exampleProduct}/>,
    <StyleSelector product={exampleProduct}/>,
    <AddToCart product={exampleProduct}/>,
  ])
}

export default ProductDetailsPage;