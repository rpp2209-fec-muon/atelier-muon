import React, { useState, useEffect } from "react";
import ProductDetailsPage from './components/Product Overview/ProductDetails.jsx';
import RelatedProducts from './components/Related Products/RelatedProducts.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
const axios = require('axios');


export default function App() {

  const [product, setProduct] = useState('/71697');

  useEffect(() => {

  }, []);

  return (
    <div>
      <ProductDetailsPage product={product}/>
      <RelatedProducts product_id={product} />
      <Reviews />
    </div>
  );
}