import React from 'react';
import axios from 'axios';
import Cards from './components/Cards.jsx';
import AddOutfit from './components/AddOutfit.jsx';
import Left from './components/Left.jsx';
import Right from './components/Right.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related: [],
      outfit: [],
      r_page: 0,
      o_page: 0,
      characteristics: {}
    }
    if (this.props.refresh) {
      this.props.setRefresh;
    }
  }
  // related list: GET /products/:product_id/related
  componentDidMount() {
    this.getRelatedList();
    this.getOutfitList();
    this.getProductcharacteristics();
  }

  getRelatedList() {
    axios
    .get('/products', { params: { type: '/related', product_id: this.props.product_id, params: {} }})
    .then((data) => {
      var newData = this.uniqueArray(data.data);
      this.setState({
        related: newData
      })
    })
    .catch(err => console.log(err));
  }

  getProductcharacteristics() {
    axios
    .get('/products', { params: { type: '', product_id: this.props.product_id, params: {} }})
    .then((data) => {
      var obj = {
        name: data.data.name,
        default_price: data.data.default_price,
        features: data.data.features
      }
      this.setState({
        characteristics: obj
      })
    })
    .catch(err => console.log("GET Products error"));
  }

  uniqueArray(array) {
    var result = [];
    array.forEach((item) => {
      var resultFind = result.find(element => element === item)
      if (resultFind === undefined) {
        var id = `/${item.toString()}`;
        if (id !== this.props.product_id) {
          result.push(item);
        }
      }
    });
    return result;
  }

  addToOutfit() {
    var id = this.props.product_id.slice(1);
    id = parseInt(id);
    var getdata = localStorage.getItem('outfit');
    if (getdata !== "undefined" && getdata !== null) {
      var outfit = JSON.parse(getdata);
    } else {
      var outfit = null;
    }
    if (outfit === null) {
      var list = [];
      list.push(id);
      localStorage.setItem('outfit', JSON.stringify(list));
      this.setState({
        outfit: list
      })
    } else {
      if(outfit.indexOf(id) === -1) {
        outfit.push(id);
        localStorage.setItem('outfit', JSON.stringify(outfit));
        this.setState({
          outfit: outfit
        })
      }
    }
  }

  removeOutfit(id) {
    // console.log("**", id);
    var getdata = localStorage.getItem('outfit');
    if (getdata !== "undefined" && getdata !== null) {
      var outfit = JSON.parse(getdata);
    } else {
      var outfit = null;
    }
    for( var i = 0; i < outfit.length; i++){

      if ( outfit[i] === id) {
        outfit.splice(i, 1);
      }
    }
    localStorage.setItem('outfit', JSON.stringify(outfit));
    this.setState({
      outfit: outfit
    })
  }

  getOutfitList() {
    var getdata = localStorage.getItem('outfit');
    if (getdata !== "undefined" && getdata !== null) {
      var outfit = JSON.parse(getdata);
    } else {
      var outfit = [];
    }
    this.setState({
      outfit: outfit
    })
  }

  relatedLast() {
    var newPage = this.state.r_page - 1;
    this.setState({
      r_page: newPage
    });
  }

  relatedNext() {
    var newPage = this.state.r_page + 1;
    this.setState({
      r_page: newPage
    });
  }

  outfitLast() {
    var newPage = this.state.o_page - 1;
    this.setState({
      o_page: newPage
    });
  }

  outfitNext() {
    var newPage = this.state.o_page + 1;
    this.setState({
      o_page: newPage
    });
  }

  render () {
    var r = this.state.r_page * 4;
    var o = this.state.o_page * 3;
    const relatedList = this.state.related.slice(r, r + 4);
    const outfitList = this.state.outfit.slice(o, o + 3);

    let relatedNext = false;
    let outfitNext = false;

    if (this.state.related.length > r + 4) { relatedNext = true };
    if (this.state.outfit.length > o + 3) { outfitNext = true };
    return(
      <div className="rp-related" data-testid="rp-related" onClick={this.props.onClick}>
        <h3>Related Products</h3>
        <div className="rp-cards-list">
          <Left page={this.state.r_page} onLast={this.relatedLast.bind(this)}/>
          {relatedList.map((product) => <Cards product_id={product} key={product} onPage={this.props.onPage} kind={'r'} main_char={this.state.characteristics}/>)}
          <Right show={relatedNext} onNext={this.relatedNext.bind(this)} />
        </div>
        <h3>Your Outfit</h3>
          <div className="rp-outfit-list">
            <Left page={this.state.o_page} onLast={this.outfitLast.bind(this)}/>
            <AddOutfit onClick={this.addToOutfit.bind(this)}/>
            {outfitList.map((product) => <Cards product_id={product} key={product} onPage={this.props.onPage} kind={'o'}
            onRemove={this.removeOutfit.bind(this)}/>)}
            <Right show={outfitNext} onNext={this.outfitNext.bind(this)} />
          </div>
      </div>
    )
  }
}
export default RelatedProducts;