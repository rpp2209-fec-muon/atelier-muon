import React from 'react';
import axios from 'axios';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.product_id,
      photos: [],
      original_price: '',
      sale_price: null,
      style_name: '',
      category: '',
      name: '',
      ratings: ''
    }
  }
/*
Product Category: GET /products/:product_id
Product Name: GET /products/:product_id
Price : defalt?: true; original_price, sale_price: GET /products/:product_id/styles
Star Rating: GET /reviews/meta
img: GET /products/:product_id/styles
*/
  componentDidMount() {
    this.getProduct();
    this.getStyle();
    this.getRating();
  }

  getProduct() {
    axios
    .get('/products', { params: { type: '', product_id: `/${this.state.product_id}`, params: {} }})
      .then((data) => {
        this.setState({
          category: data.data.category,
          name: data.data.name
        });
        console.log("GET Products Successful");
      })
      .catch(err => console.log(err));
  }

  getStyle() {
    axios
    .get('/products', { params: { type: '/styles', product_id: `/${this.state.product_id}`, params: {} }})
      .then((data) => {
        var hasDefault = false;
        data.data.results.forEach((style) => {
          if (style['default?']) {
            hasDefault = true;
            var newPhotos = [];
            style.photos.forEach((photo) => {
              newPhotos.push(photo.thumbnail_url);
            });
            this.setState({
              photos: newPhotos,
              original_price: style.original_price,
              sale_price: style.sale_price,
              style_name: style.name
            });
          }
        });
        if (!hasDefault) {
          var newPhotos = [];
          data.data.results[0].photos.forEach((photo) => {
            newPhotos.push(photo.thumbnail_url);
          });
          this.setState({
            photos: newPhotos,
            original_price: data.data.results[0].original_price,
            sale_price: data.data.results[0].sale_price,
            style_name: data.data.results[0].name
          });
        }
        console.log("GET Products Styles Successful");
      })
      .catch(err => console.log(err));
  }

  getRating() {
    var int_product_id = parseInt(this.state.product_id);
    axios
      .get('/reviews', { params: { type: '/meta', params: {
        product_id: int_product_id
      }}})
      .then((data) => {
        this.ratingTranslate(data.data.ratings);
        console.log("GET Reviews meta Successful");
      })
      .catch(err => console.log(err));

  }

  ratingTranslate(ratings) {
    var total = ratings[1] * 1 + ratings[2] * 2 + ratings[3] * 3 + ratings[4] * 4 + ratings[5] * 5;
    var totalRate = ratings[1] * 1 + ratings[2] * 1 + ratings[3] * 1 + ratings[4] * 1 + ratings[5] * 1;
    var rating = '';
    var ratePoint = Math.floor(total / totalRate);
    if (ratePoint === 0) {
      rating = '☆☆☆☆☆'
    } else if (ratePoint === 1) {
      rating = '★☆☆☆☆'
    } else if (ratePoint === 2) {
      rating = '★★☆☆☆'
    } else if (ratePoint === 3) {
      rating = '★★★☆☆'
    } else if (ratePoint === 4) {
      rating = '★★★★☆'
    } else {
      rating = '★★★★★'
    }
    this.setState({
      ratings: rating
    });
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
        <img src={this.state.photos[0] !== null ? this.state.photos[0] :
           'https://actogmbh.com/files/no-product-image.png'}></img>
        <div>{this.state.category}</div>
        <div>{this.state.name} {this.state.style_name}</div>
        <div>{price}</div>
        <div>{sale}</div>
        <div>{this.state.ratings}</div>

      </div>
    )
  }
}
export default Cards;