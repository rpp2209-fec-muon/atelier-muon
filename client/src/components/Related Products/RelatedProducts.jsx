import React from 'react';
import axios from 'axios';
import Cards from './components/Cards.jsx';
import AddOutfit from './components/AddOutfit.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related: [],
      outfit: [],
      r_page: 0,
      o_page: 0
    }
  }
  // related list: GET /products/:product_id/related
  componentDidMount() {
    this.getRelatedList();
    this.getOutfitList();
  }

  getRelatedList() {
    axios
    .get('/products', { params: { type: '/related', product_id: this.props.product_id, params: {} }})
    .then((data) => {
      var newData = this.uniqueArray(data.data);

      console.log(newData);
      this.setState({
        related: newData
      })
    })
    .catch(err => console.log(err));
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
    if (getdata !== "undefined") {
      var outfit = JSON.parse(getdata);
    } else {
      var outfit = null;
    }
    if (outfit === null) {
      var list = [];
      list.push(id);
      localStorage.setItem('outfit', JSON.stringify(list));
    } else {
      if(outfit.indexOf(id) === -1) {
        outfit.push(id);
        localStorage.setItem('outfit', JSON.stringify(outfit));
      }
    }
  }

  getOutfitList() {
    var getdata = localStorage.getItem('outfit');
    if (getdata !== "undefined") {
      var outfit = JSON.parse(getdata);
    } else {
      var outfit = [];
    }
    console.log("outfit", outfit);
    this.setState({
      outfit: outfit
    })
  }

  render () {
    var r = this.state.r_page * 4;
    var o = this.state.o_page * 3;
    const relatedList = this.state.related.slice(r, r + 4);
    const outfitList = this.state.outfit.slice(o, o + 3);
    return(
      <div className="rp-related" data-testid="rp-related">
        <h3>Related Products</h3>
        <div className="rp-cards-list">
          {relatedList.map((product) => <Cards product_id={product} key={product} onClick={this.props.onClick} kind={'r'}/>)}
        </div>
        <h3>Your Outfit</h3>
          <div className="rp-outfit-list">
            <AddOutfit onClick={this.addToOutfit.bind(this)}/>
            {outfitList.map((product) => <Cards product_id={product} key={product} onClick={this.props.onClick} kind={'o'}/>)}
          </div>
      </div>
    )
  }
}
export default RelatedProducts;