import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGallery (props) {

  const [images, setImages] = useState([])

  useEffect( () => {
    getStyle();
    console.log(props.id);
  })

  function getStyle () {
    axios
    .get('/products', { params: { type: '/styles', product_id: props.id, params: {} }})
      .then((data) => {
        // data.data.result gives me array of photos
        console.log('image data', data.data.results)
      })
      .catch(err => console.log(err));
  }

  return (
    null
  )
}

export default ImageGallery;