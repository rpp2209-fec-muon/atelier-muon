import React from 'react';
import axios from 'axios';
import Price from '../../Global/Price.jsx';
import Star from '../../Global/Star.jsx';
import Comparison from './Comparison.jsx';


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
      ratings: 0,
      char: {},
      comparison: false
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
        var obj = {
          name: data.data.name,
          default_price: data.data.default_price,
          features: data.data.features
        }
        this.setState({
          category: data.data.category,
          name: data.data.name,
          char: obj
        });
      })
      .catch(err => console.log("GET products error"));
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
      .catch(err => console.log("GET styles error"));
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
      .catch(err => console.log("GET meta reviews error"));

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

  openComparison () {
    this.setState({
      comparison: true
    })
  }

  closeComparison () {
    this.setState({
      comparison: false
    })
  }

  render () {
    let action;
    let comparison;
    if (this.props.kind === 'o') {
      action = <span className="rp-times fa fa-times-circle-o" onClick={this.removeOutfit.bind(this)}></span>;
    } else {
      action = <span className="rp-star-o fa fa-star-o" onClick={this.openComparison.bind(this)}></span>;
    }

    if (this.state.comparison) {
      comparison = <Comparison o_product={this.props.main_char} c_product={this.state.char} onClickOutside={this.closeComparison.bind(this)}/>
    } else {
      comparison = <div></div>;
    }


    return(
      <div className="rp-card" data-testid="rp-card">
        <div>{comparison}</div>
        <div className="rp-card-action">
          {action}
        </div>
        <img onClick={this.changePage.bind(this)} alt="rp-product-img" className="rp-card-img" src={this.state.photos[0] !== null ? this.state.photos[0] :
           'https://actogmbh.com/files/no-product-image.png'}></img>
        <div onClick={this.changePage.bind(this)} className="rp-card-category" data-testid="rp-card-category">{this.state.category}</div>
        <h3 onClick={this.changePage.bind(this)} className="rp-card-name" data-testid="rp-card-name">{this.state.name} {this.state.style_name}</h3>
        <h3 className='rp-card-price'data-testid="rp-card-price"><Price original_price={this.state.original_price} sale_price={this.state.sale_price}/></h3>
        <div onClick={this.changePage.bind(this)} className="rp-card-star">
          <Star key={this.props.product_id} ratings={this.state.ratings} />
        </div>
      </div>
    )
  }
}
export default Cards;