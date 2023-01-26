import React from 'react';
import axios from 'axios';
import Cards from './components/Cards.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      related: []
    }
  }
  // related list: GET /products/:product_id/related
  componentDidMount() {
    console.log("***", this.props.product_id);
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

  render () {
    return(
      <div className ="rp-related" data-testid="rp-related">
        <h3>Related Products</h3>
        <div className="rp-cards-list">{this.state.related.map((product) => <Cards product_id={product} key={product} onClick={this.props.onClick}/>)}</div>
        <h3>My Outfits</h3>
      </div>
    )
  }
}
export default RelatedProducts;