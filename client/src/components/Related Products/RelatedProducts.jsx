import React from 'react';
import axios from 'axios';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.product_id
    }
  }
/*
related list: GET /products/:product_id/related
Product Category: GET /products/:product_id
Product Name: GET /products/:product_id
Price : defalt?: true; original_price, sale_price: GET /products/:product_id/styles
Star Rating: GET /reviews/meta
img: GET /products/:product_id/styles
*/
  componentDidMount() {

  }

  render () {
    return(
      <div>
      </div>
    )
  }
}
export default RelatedProducts;