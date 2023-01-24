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
      price = <div>{this.props.original_price}</div>;
      sale = <div></div>;
    } else {
      price =  <div><del>{this.props.original_price}</del></div>;
      sale  =  <div>{this.props.sale_price}</div>;
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