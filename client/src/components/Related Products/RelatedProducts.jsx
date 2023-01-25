import React from 'react';
import axios from 'axios';
import Cards from './components/Cards.jsx';

class RelatedProducts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_id: props.product_id,
      related: []
    }
  }
  // related list: GET /products/:product_id/related
  componentDidMount() {
    axios
      .get('/products', { params: { type: '/related', product_id: this.state.product_id, params: {} }})
      .then((data) => {
        this.setState({
          related: data.data
        })
        console.log("GET Products Related Successful");
      })
      .catch(err => console.log(err));
  }

  render () {
    return(
      <div className ="rp-related" data-testid="rp-related">
        <h3>Related Products</h3>
        <div className="rp-cards-list">{this.state.related.map((product) => <Cards product_id={product} key={product} />)}</div>
        <h3>My Outfits</h3>
      </div>
    )
  }
}
export default RelatedProducts;