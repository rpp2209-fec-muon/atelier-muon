import React from 'react';
import axios from 'axios';
import Price from '../../Global/Price.jsx';
import Star from '../../Global/Star.jsx';

class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      style_name: '',
      category: '',
      original_price: '',
      sale_price: null,
      name: '',
      ratings: 0
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
    .get('/products', { params: { type: '', product_id: `/${this.props.product_id}`, params: {} }})
      .then((data) => {
        this.setState({
          category: data.data.category,
          name: data.data.name
        });
      })
      .catch(err => console.log(err));
  }

  getStyle() {
    axios
    .get('/products', { params: { type: '/styles', product_id: `/${this.props.product_id}`, params: {} }})
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
              original_price: style.original_price,
              sale_price: style.sale_price,
              photos: newPhotos,
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
            style_name: data.data.results[0].name,
            original_price: data.data.results[0].original_price,
            sale_price: data.data.results[0].sale_price
          });
        }
      })
      .catch(err => console.log(err));
  }

  getRating() {
    var int_product_id = parseInt(this.props.product_id);
    axios
      .get('/reviews', { params: { type: '/meta', params: {
        product_id: int_product_id
      }}})
      .then((data) => {
        this.ratingTranslate(data.data.ratings);
      })
      .catch(err => console.log(err));

  }

  ratingTranslate(ratings) {
    for (var i = 1; i <= 5; i ++) {
      if (ratings[i] === undefined) {
        ratings[i] = 0;
      }
    }
    var total = ratings[1] * 1 + ratings[2] * 2 + ratings[3] * 3 + ratings[4] * 4 + ratings[5] * 5;
    var totalRate = ratings[1] * 1 + ratings[2] * 1 + ratings[3] * 1 + ratings[4] * 1 + ratings[5] * 1;
    var rating =  total / totalRate;
    this.setState({
      ratings: rating
    });
  }

  changePage() {
    this.props.onPage(`/${this.props.product_id}`);
  }

  removeOutfit() {
    this.props.onRemove(this.props.product_id);
  }

  render () {
    let action;
    if (this.props.kind === 'o') {
      action = <span className="rp-times fa fa-times-circle-o" onClick={this.removeOutfit.bind(this)}></span>;
    } else {
      action = <span className="rp-star-o fa fa-star-o"></span>;
    }
    return(
      <div className="rp-card" data-testid="rp-card">
        <div className="rp-card-action">
          {action}
        </div>
        <img onClick={this.changePage.bind(this)} alt="rp-product-img" className="rp-card-img" src={this.state.photos[0] !== null ? this.state.photos[0] :
           'https://actogmbh.com/files/no-product-image.png'}></img>
        <div onClick={this.changePage.bind(this)} className="rp-card-category">{this.state.category}</div>
        <div onClick={this.changePage.bind(this)} className="rp-card-name">{this.state.name} {this.state.style_name}</div>
        <div onClick={this.changePage.bind(this)} className="rp-card-price">
          <Price original_price={this.state.original_price} sale_price={this.state.sale_price}/>
        </div>
        <div onClick={this.changePage.bind(this)} className="rp-card-star">
          <Star key={this.props.product_id} ratings={this.state.ratings} />
        </div>
      </div>
    )
  }
}
export default Cards;