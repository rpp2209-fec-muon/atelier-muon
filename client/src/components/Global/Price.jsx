import React from 'react';

class Price extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }


  render () {
    let price, sale;
    if (this.props.sale_price === null) {
      price = <div>${this.props.original_price}</div>;
    } else {
      price =  <div className='sale-price'>${this.props.sale_price}  <del>${this.props.original_price}</del> </div>;
    }

    return(
      <div className="g-price">
        <div>{price}</div>
      </div>
    )
  }
}
export default Price;