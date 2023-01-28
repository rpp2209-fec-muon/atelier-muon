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
  const [currPhoto, setCurrPhoto] = useState('');

  // create style image state to be updated with onclick function for next
  // style image

  useEffect( () => {
    if (exampleProduct.length === 0 && productStyles.length === 0 && currPhoto === '') {
      getStyles()
      getProduct()
    }
  })

  function getStyles () {
    axios
    .get('/products', { params: { type: '/styles', product_id: props.product_id, params: {} }})
      .then((data) => {
        // data.data.results gives me array of styles that contain photos
        setProductStyles(data.data.results);
        setCurrentStyle(data.data.results[0])
        setCurrPhoto(data.data.results[0].photos[0].thumbnail_url)
        return (data.data.results);
      })
      .catch(err => console.log(err));
  }

  function getProduct () {
    axios
    .get('/products', { params: { type: '', product_id: props.product_id, params: {} }})
    .then((data) => {
      console.log('GET Request Successful');
      var product = []
      product.push(data.data)
      console.log('result', data.data)
      setExampleProduct(product);
    })
    .catch(err => console.log(err));
  }

  function updateStyle (e) {
    e.preventDefault();
    // e.target.value gives us style ID
    // can sort through productStyles array and match id to correct object

    for (var i = 0; i < productStyles.length; i++) {
      if (productStyles[i]['style_id'].toString() === e.target.value) {
        console.log(productStyles[i]['style_id'])
        setCurrentStyle(productStyles[i])
        setCurrPhoto(productStyles[i].photos[0].thumbnail_url);
      }
    }
  }

  function updatePhoto (e) {
    // onclick function that updates the photo
    e.preventDefault();
    setCurrPhoto(currentStyle.photos[e.target.id].thumbnail_url);
  }

  if (productStyles.length && currentStyle.photos.length) {
    return (
      <div id={'test-id' + props.product_id}>
        <ImageGallery key={'1'} style={currentStyle} id={props.product} currPhoto={currPhoto} update={updatePhoto}/>
        <ProductInfo key={'2'} product={exampleProduct}/>
        <StyleSelector key={'3'} styles={productStyles} update={updateStyle}/>
        <AddToCart key={'4'} product={exampleProduct}/>
      </div>
    )
  } else {
    return null
  }
}

export default ProductOverview;