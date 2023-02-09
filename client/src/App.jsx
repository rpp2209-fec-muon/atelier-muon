import React, { useState, useEffect } from "react";
import ProductOverview from './components/Product Overview/Product Overview.jsx';
import RelatedProducts from './components/Related Products/RelatedProducts.jsx';
import Reviews from './components/Reviews/Reviews.jsx';
import withLogger from './components/Global/ClickLogger.jsx';

const axios = require('axios');


export default function App() {

  let productId = window.location.pathname;
  if (productId === '/') {
    productId = '/71697';
  }
  const [product, setProduct] = useState(productId);
  const [refreshRP, setRefreshRP] = useState(false);

  useEffect(() => {

  }, []);

  const changePage = (product_id) => {
    window.location.pathname = product_id;
    setProduct(product_id);
    console.log("changed");
  }

  function refresh () {
    setRefreshRP(!refreshRP);
  }

  const LoggableRelatedProducts = withLogger(RelatedProducts, "Related Products");
  const LoggableProductOverview = withLogger(ProductOverview, "Product Overview");
  const LoggableReviews = withLogger(Reviews, "Reviews");

  return (
    <div>
      <LoggableProductOverview  key={`o-${product}`} product_id={product} refresh={refreshRP} setRefresh={refresh} />
      <LoggableRelatedProducts key={`rp-${product}`} product_id={product} refresh={refreshRP} setRefresh={(refresh) => refresh()} onPage={(product_id) => changePage(product_id)}/>
      <LoggableReviews key={`r-${product}`} product_id={product}/>
    </div>
  );
}
