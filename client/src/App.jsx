import React, { useState, useEffect } from "react";
import ProductOverview from './components/Product Overview/Product Overview.jsx';
import RelatedProducts from './components/Related Products/RelatedProducts.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
const axios = require('axios');


export default function App() {

  const [product, setProduct] = useState('/71697');

  useEffect(() => {

  }, []);

  return (
    <div>
      <ProductOverview product_id={product}/>
      <RelatedProducts product_id={product} />
      <Reviews product_id={product}/>
    </div>
  );
}
