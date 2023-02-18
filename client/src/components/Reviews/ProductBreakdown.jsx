import React, { useState, useEffect } from 'react';

export default function ProductBreakdown(props) {
  var factors = props.meta.characteristics;

  const calculatePercentage = (string) => {
    if (string === undefined) {
      return 0;
    }

    let value = Number(string);
    return ((value / 5) * 100);
  }

  return (
    <div className="reviews-flexBreakdownChild" data-testid="product-parent-div">
      {factors.Size &&
        <div>
          <div className='factor-title'>Size</div>
          <div className='factor-bars-parent'>
            <i className="arrow-down" style={{ left: `${calculatePercentage(factors.Size.value)}%` }}></i>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
          </div>
          <div className='factor-label-parent'>
            <p className='factor-label'>A size too small</p>
            <p className='factor-label'>A size too wide</p>
          </div>
        </div>
      }
      {factors.Width &&
        <div>
          <div className='factor-title'>Width</div>
          <div className='factor-bars-parent'>
            <i className="arrow-down" style={{ left: `${calculatePercentage(factors.Width.value)}%` }}></i>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
          </div>
          <div className='factor-label-parent'>
            <p className='factor-label'>Too narrow</p>
            <p className='factor-label'>Too wide</p>
          </div>
        </div>
      }
      {factors.Comfort &&
        <div>
          <div className='factor-title'>Comfort</div>
          <div className='factor-bars-parent'>
            <i className="arrow-down" style={{ left: `${calculatePercentage(factors.Comfort.value)}%` }}></i>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
          </div>
          <div className='factor-label-parent'>
            <p className='factor-label'>Uncomfortable</p>
            <p className='factor-label'>Perfect</p>
          </div>
        </div>
      }
      {factors.Quality &&
        <div>
          <div className='factor-title'>Quality</div>
          <div className='factor-bars-parent'>
            <i className="arrow-down" style={{ left: `${calculatePercentage(factors.Quality.value)}%` }}></i>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
          </div>
          <div className='factor-label-parent'>
            <p className='factor-label'>Poor</p>
            <p className='factor-label'>Perfect</p>
          </div>
        </div>
      }
      {factors.Length &&
        <div>
          <div className='factor-title'>Length</div>
          <div className='factor-bars-parent'>
            <i className="arrow-down" style={{ left: `${calculatePercentage(factors.Length.value)}%` }}></i>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
          </div>
          <div className='factor-label-parent'>
            <p className='factor-label'>Runs short</p>
            <p className='factor-label'>Runs long</p>
          </div>
        </div>
      }
      {factors.Fit &&
        <div>
          <div className='factor-title'>Fit</div>
          <div className='factor-bars-parent'>
            <i className="arrow-down" style={{ left: `${calculatePercentage(factors.Fit.value)}%` }}></i>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
            <div className='factor-bar'></div>
          </div>
          <div className='factor-label-parent'>
            <p className='factor-label'>Runs tight</p>
            <p className='factor-label'>Runs long</p>
          </div>
        </div>
      }
    </div>
  )
}