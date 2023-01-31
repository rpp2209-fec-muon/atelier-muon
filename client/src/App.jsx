import React, { useState, useEffect } from "react";
import ProductOverview from './components/Product Overview/Product Overview.jsx';
import RelatedProducts from './components/Related Products/RelatedProducts.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
const axios = require('axios');


export default function App() {

  const [product, setProduct] = useState('/71697');


  useEffect(() => {

  }, []);

  const changePage = (product_id) => {
    setProduct(product_id);
    console.log("changed");
  }

  return (
    <div>
      <ProductOverview key={`o-${product}`} product_id={product}/>
      <RelatedProducts  key={`rp-${product}`} product_id={product} onClick={(product_id) => changePage(product_id)}/>
      <Reviews id='reviews-component' key={`r-${product}`} product_id={product}/>
    </div>
  );
}
