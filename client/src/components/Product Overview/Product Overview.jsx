// <!-- This is just a placeholder so git commits the basic folder structure! Feel free to delete me when you start adding files to this folder. -->
import React, {useEffect, useState } from 'react';
import ImageGallery from './Overview Components/Image Gallery.jsx';
import ProductInfo from './Overview Components/Product Information.jsx';
import StyleSelector from './Overview Components/Style Selector.jsx';
import AddToCart from './Overview Components/Add Cart.jsx';
import axios from 'axios';

function ProductOverview (props) {

  // create state to hold current view
  const [currentProduct, setCurrentProduct] = useState([])
  const [productStyles, setProductStyles] = useState([])
  const [currentStyle, setCurrentStyle] = useState([])
  const [currPhoto, setCurrPhoto] = useState('');
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState({});
  const [checkmark, setCheckmark] = useState([]);
  // create state to hold quantity
  const [quantity, setQuantity] = useState([])
  const [SKUs, setSKUs] = useState([])
  const [size, setSize] = useState('Select Size');
  const [itemQuantity, setItemQuantity] = useState('-');


  // create style image state to be updated with onclick function for next
  // style image

  useEffect( () => {
    if (currentProduct.length === 0 && productStyles.length === 0 && currPhoto === '') {
      getStyles()
      getProduct()
      getRating()
    }
  })


  // ---------------------------- sub methods ---------------------------- //

  function checkMarks (index, styles) {
    var checks = [];
    for (var i = 0; i < styles.length; i++) {
      if (i === index) {
        checks.push(true);
      } else {
        checks.push(false);
      }
    }
    setCheckmark(checks);
  }

  // ---------------------------- get methods ---------------------------- //

  function getStyles () {
    axios
    .get('/products', { params: { type: '/styles', product_id: props.product_id, params: {} }})
      .then((data) => {
        // data.data.results gives me array of styles that contain photos
        setProductStyles(data.data.results);
        console.log('styles data', data.data.results);
        checkMarks(0, data.data.results)
        setPrice({original: data.data.results[0].original_price, sale: data.data.results[0].sale_price});
        setCurrentStyle(data.data.results[0]);
        getSKUs(data.data.results[0])
        setCurrPhoto(data.data.results[0].photos[0].thumbnail_url);
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
      console.log('product info', data.data)
      product.push(data.data)
      setCurrentProduct(product);
    })
    .catch(err => console.log(err));
  }

  function getRating() {
    var int_product_id = parseInt(props.product_id.slice(1));
    console.log(int_product_id);
    axios
      .get('/reviews', { params: { type: '/meta', params: {
        product_id: int_product_id
      }}})
      .then((data) => {

        ratingTranslate(data.data.ratings);
      })
      .catch(err => console.log(err));

  }

  function ratingTranslate(ratings) {
    for (var i = 1; i <= 5; i ++) {
      if (ratings[i] === undefined) {
        ratings[i] = 0;
      }
    }
    var total = ratings[1] * 1 + ratings[2] * 2 + ratings[3] * 3 + ratings[4] * 4 + ratings[5] * 5;
    var totalRate = ratings[1] * 1 + ratings[2] * 1 + ratings[3] * 1 + ratings[4] * 1 + ratings[5] * 1;
    var rating =  total / totalRate;
    setRating(rating);
  }

  function getSKUs (style) {
    var sizes = [];
    for (var key in style.skus) {
      if (style.skus[key].quantity > 0) {
        sizes.push(style.skus[key])
      }
    }
    setSKUs(sizes);
  }

  // ---------------------------- update methods ---------------------------- //

  function updateStyle (e) {
    e.preventDefault();
    // e.target.value gives us style ID
    // can sort through productStyles array and match id to correct object

    console.log('might be image', e.target.alt)

    for (var i = 0; i < productStyles.length; i++) {
      if (productStyles[i]['style_id'].toString() === e.target.alt) {
        setCurrentStyle(productStyles[i])
        getSKUs(productStyles[i]);
        setSize('Select Size');
        setItemQuantity('-');
        setCurrPhoto(productStyles[i].photos[0].thumbnail_url);
        setPrice({original: productStyles[i].original_price, sale: productStyles[i].sale_price})
        checkMarks(i, productStyles);
      }
    }
  }

  function updatePhoto (e) {
    // onclick function that updates the photo
    e.preventDefault();
    setCurrPhoto(currentStyle.photos[e.target.id].thumbnail_url);
  }


  function sizeChange (e) {
    e.preventDefault();

    var data = JSON.parse(e.target.value);

    var count = []
    for (var i = 1; i <= data.quantity; i++) {
      if (count.length < 15) {
        count.push(i);
      }
    }
    setSize(JSON.stringify(data));
    setItemQuantity('1')
    setQuantity(count);
  }

  function quantityChange (e) {
    e.preventDefault();

    setItemQuantity(e.target.value);
  }

  // ---------------------------- render component ---------------------------- //


  if (productStyles.length && currentStyle.photos.length) {
    return (
      <div id={'test-id' + props.product_id}>
        <ImageGallery key={'1'} style={currentStyle} id={props.product} currPhoto={currPhoto} update={updatePhoto}/>
        <ProductInfo key={'2'} product={currentProduct} star={rating} price={price}/>
        <StyleSelector key={'3'} check={checkmark} style={currentStyle} styles={productStyles} update={updateStyle}/>
        <AddToCart key={'4'} product={currentProduct} styles={currentStyle} skus={SKUs} quantity={quantity} update={sizeChange} chosenSize={size} chosenQuantity={itemQuantity} update2={quantityChange}/>
      </div>
    )
  } else {
    return null
  }
}

export default ProductOverview;