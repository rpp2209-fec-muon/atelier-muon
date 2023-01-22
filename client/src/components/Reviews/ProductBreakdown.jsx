import React, { useState, useEffect } from 'react';

export default function ProductBreakdown(props) {
  var factors = props.meta.characteristics;

  return (
    <div>
      {factors.Size &&
        <div>
          <div>Size</div>
          <div>{factors.Size.value}</div>
        </div>
      }
      {factors.Width &&
        <div>
          <div>Width</div>
          <div>{factors.Width.value}</div>
        </div>
      }
      {factors.Comfort &&
        <div>
          <div>Comfort</div>
          <div>{factors.Comfort.value}</div>
        </div>
      }
      {factors.Quality &&
        <div>
          <div>Quality</div>
          <div>{factors.Quality.value}</div>
        </div>
      }
      {factors.Length &&
        <div>
          <div>Length</div>
          <div>{factors.Length.value}</div>
        </div>
      }
      {factors.Fit &&
        <div>
          <div>Fit</div>
          <div>{factors.Fit.value}</div>
        </div>
      }
    </div>
  )
}