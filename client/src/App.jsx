import React, { useState, useEffect } from "react";
import RelatedProducts from './components/Related Products/RelatedProducts.jsx';
const axios = require('axios');


export default function App() {

  const [product, setProduct] = useState('/71697');

  useEffect(() => {

  }, []);

  return (
    <div>
      <RelatedProducts product_id={product} />
    </div>
  );
}