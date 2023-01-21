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
        console.log(data.data.result)
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='test' > Image Gallery </div>
  )
}

export default ImageGallery;