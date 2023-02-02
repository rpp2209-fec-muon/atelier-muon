import React from 'react';

export default function Left(props) {
  if (props.page === 0) {
    return <div className ="rp-left"></div>
  } else {
    return (
      <div className="rp-left">
        <span className="chevron-left fa fa-chevron-left" onClick={props.onLast}></span>
      </div>
    )
  }
}