import React from 'react';

export default class Features extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      o_feature: "",
      c_featrue: ""
    }
  }

  componentDidMount() {
    this.getFeature();
  }


  getFeature() {
    var o_f = "";
    var c_f = "";
    this.props.o_features.forEach((feature) => {
      if (this.props.feature === feature.feature) {
        if (feature.value === true) {
            o_f = "✓";
        } else if (feature.value !== null) {
            o_f = feature.value;
        }
      }
    });
    this.props.c_features.forEach((feature) => {
      if (this.props.feature === feature.feature) {
        if (feature.value === true) {
            c_f = "✓";
        } else if (feature.value !== null) {
            c_f = feature.value;
        }
      }
    });
    this.setState({
      o_feature: o_f,
      c_featrue: c_f
    })
  }

  render() {
    return (
      <tr className="rp-tr">
        <td className="rp-comparison-o-value">{this.state.o_feature}</td>
        <td className="rp-comparison-value">{this.props.feature}</td>
        <td className="rp-comparison-c-value">{this.state.c_featrue}</td>
    </tr>
    )
  }
}