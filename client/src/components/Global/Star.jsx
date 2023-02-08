import React from 'react';

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  pointToStar(point) {
    var arr = [];
    for (var i = 0; i < 5; i ++) {
      if (point >= 1) {
        arr.push("star-fill");
        point -= 1;
      } else if (point >= 0.75) {
        arr.push("star-threeQuarter");
        point = 0;
      } else if (point >= 0.5) {
        arr.push("star-half");
        point = 0;
      } else if (point >= 0.25) {
        arr.push("star-quarter");
        point = 0;
      } else {
        arr.push("");
      }
    }
    return arr;
  }

  render () {
    const stars = this.pointToStar(this.props.ratings);
    return(
      <div data-testid="g-star">
        {stars.map((star, i) =>  <span className={`star fa fa-star ${star}`} key={i}></span>)}
      </div>
    )
  }
}
export default Star;