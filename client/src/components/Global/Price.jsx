import React from 'react';
import axios from 'axios';

class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.product_id,
      original_price: '',
      sale_price: null
    }
  }

  componentDidMount() {
    this.getPrice();
  }



  getPrice() {
    axios
    .get('/products', { params: { type: '/styles', product_id: `/${this.state.product_id}`, params: {} }})
      .then((data) => {
        var hasDefault = false;
        data.data.results.forEach((style) => {
          if (style['default?']) {
            hasDefault = true;
            this.setState({
              original_price: style.original_price,
              sale_price: style.sale_price
            });
          }
        });
        if (!hasDefault) {
          this.setState({
            original_price: data.data.results[0].original_price,
            sale_price: data.data.results[0].sale_price
          });
        }
        console.log("GET Products Price Successful");
      })
      .catch(err => console.log(err));
  }

  render () {
    let price, sale;
    if (this.state.sale_price === null) {
      price = <div>{this.state.original_price}</div>;
      sale = <div></div>;
    } else {
      price =  <div style="text-decoration: line-through;">{this.state.original_price}</div>;
      sale  =  <div>{this.state.sale_price}</div>;
    }

    return(
      <div>
        <div>{price}</div>
        <div>{sale}</div>
      </div>
    )
  }
}
export default Price;