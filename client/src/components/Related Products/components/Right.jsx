import React from 'react';

export default function Right(props) {
  if (props.show) {
    return (
      <div className="rp-right" data-testid="rp-right" >
        <span className="chevron-right fa fa-chevron-right" onClick={props.onNext}></span>
      </div>
    )
  } else {
    return <div className ="rp-right" data-testid="rp-right" ></div>
  }
}