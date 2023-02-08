import React from 'react';
import Features from './Features.jsx';

export default class Comparison extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      features: []
    }
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
    this.getFeaturesList();
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  };

  getFeaturesList () {
    var arr = [];
    this.props.o_product.features.forEach((item) => {
      var feature = item.feature;
      if (arr.indexOf(feature) === -1) {
        arr.push(feature);
      }
    });
    this.props.c_product.features.forEach((item) => {
      var feature = item.feature;
      if (arr.indexOf(feature) === -1) {
        arr.push(feature);
      }
    });
    this.setState({
      features: arr
    });
  }

  render() {
    return (
      <div ref={this.ref} className='rp-comparison'>
        <div className='rp-comparison-text'>
          <p>Comparison</p>
          <table className="rp-comparsion-table">
            <thead>
              <tr className="rp-tr">
                <th className="rp-comparison-name">{this.props.o_product.name}</th>
                <th className="rp-comparison-name"></th>
                <th className="rp-comparison-name">{this.props.c_product.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="rp-tr">
                <td className="rp-comparison-o-value">${this.props.o_product.default_price}</td>
                <td className="rp-comparison-value">Price</td>
                <td className="rp-comparison-c-value">${this.props.c_product.default_price}</td>
              </tr>
              {this.state.features.map((feature) => <Features feature={feature} key={feature}
              o_features={this.props.o_product.features} c_features={this.props.c_product.features}/>)}
            </tbody>
          </table>
        </div>
      </div> );
  }
}