import React from 'react';

export default function Left(props) {
  if (props.show) {
    return (
      <div className="rp-right">
        <span className="chevron-right fa fa-chevron-right" onClick={props.onNext}></span>
      </div>
    )
  } else {
    return <div className ="rp-right"></div>
  }
}