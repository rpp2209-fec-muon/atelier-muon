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
  const [outfit, setOutfit] = useState([]);
  const [productStyles, setProductStyles] = useState([])
  const [currentStyle, setCurrentStyle] = useState([])
  const [currPhoto, setCurrPhoto] = useState('');
  const [currPhotoIndex, setCurrPhotoIndex] = useState(0);
  const [rating, setRating] = useState(0);
  const [price, setPrice] = useState({});
  const [checkmark, setCheckmark] = useState([]);
  // create state to hold quantity
  const [quantity, setQuantity] = useState([])
  const [SKUs, setSKUs] = useState([])
  const [size, setSize] = useState('Select Size');
  const [itemQuantity, setItemQuantity] = useState('-');
  const [reviews, setReviews] = useState(0)
  const [currSKU, setCurrSKU] = useState(0)
  const [expandedView, setExpandedView] = useState(false);


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
    setReviews(totalRate)
  }

  function getSKUs (style) {
    var sizes = [];
    for (var key in style.skus) {
      if (style.skus[key].quantity > 0) {
        style.skus[key]['sku_id'] = key;
        sizes.push(style.skus[key])
      }
    }
    setSKUs(sizes);
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
        setCurrPhoto(data.data.results[0].photos[0].url);
        setCurrPhotoIndex(0);
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
        setCurrPhoto(productStyles[i].photos[0].url);
        setCurrPhotoIndex(0);
        setPrice({original: productStyles[i].original_price, sale: productStyles[i].sale_price})
        checkMarks(i, productStyles);
      }
    }
  }

  function updatePhoto (e) {
    // onclick function that updates the photo
    e.preventDefault();


    if (e.target.id) {
      var index = parseInt(e.target.id)
    } else {
      var index = parseInt(e.target.getAttribute('data-id'))
      console.log(index);
    }

    if (e.target.className === 'overview-next-right') {
      if (index === currentStyle.photos.length - 1) {
        setCurrPhoto(currentStyle.photos[0].url)
        setCurrPhotoIndex(0);
      } else {
        setCurrPhoto(currentStyle.photos[index + 1].url)
        setCurrPhotoIndex(index + 1);
      }
    } else if (e.target.className === 'overview-next-left') {
      if (index === 0) {
        console.log('left', index);
        setCurrPhoto(currentStyle.photos[currentStyle.photos.length - 1].url)
        setCurrPhotoIndex(currentStyle.photos.length - 1);
      } else {
        setCurrPhoto(currentStyle.photos[index - 1].url)
        setCurrPhotoIndex(index - 1);
      }
    } else {
      setCurrPhoto(currentStyle.photos[index].url);
      setCurrPhotoIndex(index);
    }
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
    var currSKU = parseInt(data.sku_id);
    setCurrSKU(currSKU);
    setSize(JSON.stringify(data));
    setItemQuantity('1')
    setQuantity(count);
  }

  function quantityChange (e) {
    e.preventDefault();

    setItemQuantity(e.target.value);
  }

  function expandView (e) {
    e.preventDefault();
    console.log('should ping', expandedView);
    setExpandedView(!expandedView)
  }

  function addToOutfit() {
    var id = props.product_id.slice(1);
    id = parseInt(id);
    var getdata = localStorage.getItem('outfit');
    if (getdata !== "undefined" && getdata !== null) {
      var outfit = JSON.parse(getdata);
    } else {
      var outfit = null;
    }
    if (outfit === null) {
      var list = [];
      list.push(id);
      localStorage.setItem('outfit', JSON.stringify(list));
      setOutfit(list);
    } else {
      if(outfit.indexOf(id) === -1) {
        outfit.push(id);
        localStorage.setItem('outfit', JSON.stringify(outfit));
        setOutfit(list);
      }
    }
    props.setRefresh();
  }

  // ---------------------------- render component ---------------------------- //


  if (productStyles.length && currentStyle.photos.length && !expandedView) {
    return (
      <div key={'overview-main-parent'} className='overview-main-parent' id={'test-id' + props.product_id} onClick={props.onClick}>
        <ImageGallery key={'1'} style={currentStyle} id={props.product} currPhoto={currPhoto} currPhotoIndex={currPhotoIndex} update={updatePhoto} setView={expandView}/>
        <div key={'overview-main-parent-2'} className='overview-main-parent-2'>
          <ProductInfo  key={'2'} product={currentProduct} star={rating} price={price} reviews={reviews}/>
          <StyleSelector key={'3'} check={checkmark} style={currentStyle} styles={productStyles} update={updateStyle}/>
          <AddToCart key={'4'} outfit={addToOutfit} product={currentProduct} styles={currentStyle} skus={SKUs} quantity={quantity} update={sizeChange} chosenSize={size} chosenQuantity={itemQuantity} update2={quantityChange} chosenSKU={currSKU}/>
        </div>
      </div>
    )
  } else if (productStyles.length && currentStyle.photos.length && expandedView) {
    return (
      <div key={'overview-main-parent'} className='overview-main-parent' id={'test-id' + props.product_id} onClick={props.onClick}>
        <ImageGallery key={'5'} style={currentStyle} id={props.product} currPhoto={currPhoto} currPhotoIndex={currPhotoIndex} update={updatePhoto} setView={expandView} expanded={true} />
      </div>
      )
  } else {
    return null
  }
}

export default ProductOverview;