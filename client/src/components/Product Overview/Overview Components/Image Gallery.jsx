import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ImageGallery (props) {

  const [styles, setStyles] = useState([])

  useEffect( () => {
    getStyle();
    console.log(props.id);
  })

  return (
    null
  )
}

export default ImageGallery;