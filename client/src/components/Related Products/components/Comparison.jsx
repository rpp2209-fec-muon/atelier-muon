import React from 'react';

export default class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event) {
    if (this.ref.current && !this.ref.current.contains(event.target)) {
      this.props.onClickOutside && this.props.onClickOutside();
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  };

  render() {
    return (
      <div ref={this.ref} className='rp-comparison'>
        <div className='rp-comparison-text'>
          <p>Comparison</p>
          <table className="rp-comparsion-table">
            <thead>
              <tr>
                <th className="rp-comparison-o-name">{this.props.o_product.name}</th>
                <th></th>
                <th className="rp-comparison-c-name">{this.props.c_product.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="rp-comparison-o-value">${this.props.o_product.default_price}</td>
                <td className="rp-comparison-value">Price</td>
                <td className="rp-comparison-c-value">${this.props.c_product.default_price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> );
  }
}