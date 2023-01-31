import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';

export default function NewReviewModal({ closeModal, meta }) {

  const [chars, setCharState] = useState({
    recommend: '',
    size: '',
    width: '',
    comfort: '',
    quality: '',
    length: '',
    fit: ''
  })


  const handleRadioChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;

    setCharState(chars => ({
      ...chars,
      [name]: value
    }))
  }

  return (
    <div className='reviews-modalOverlay'>
      <div className='reviews-modalContainer'>
        <StarRating />

        <p onClick={() => {closeModal()}}>X</p>

        <div className="reviews-modal-recommend-container" onChange={(e) => {handleRadioChange(e)}}>
          <p>Do you recommend this product?</p>
          <input type="radio" id="yes-radio" name="recommend" value="Yes"></input>
          <label>Yes</label>
          <input type="radio" id="no-radio" name="recommend" value="No"></input>
          <label>No</label>
        </div>

        <div className="reviews-modal-characteristics-container" onChange={(e) => {handleRadioChange(e)}}>
        {meta.characteristics.Size &&
          <div className="reviews-modal-size-container">
            <p>Size</p>
            <input type="radio" id="size-1" name="size" value="1"></input>
            <label>A size too small</label>
            <input type="radio" id="size-2" name="size" value="2"></input>
            <input type="radio" id="size-3" name="size" value="3"></input>
            <input type="radio" id="size-4" name="size" value="4"></input>
            <input type="radio" id="size-5" name="size" value="5"></input>
            <label>A size too wide</label>
          </div>
        }
        {meta.characteristics.Width &&
          <div className="reviews-modal-width-container">
            <p>Width</p>
            <input type="radio" id="width-1" name="width" value="1"></input>
            <label>Too narrow</label>
            <input type="radio" id="width-2" name="width" value="2"></input>
            <input type="radio" id="width-3" name="width" value="3"></input>
            <input type="radio" id="width-4" name="width" value="4"></input>
            <input type="radio" id="width-5" name="width" value="5"></input>
            <label>Too wide</label>
          </div>
        }
        {meta.characteristics.Comfort &&
          <div className="reviews-modal-comfort-container">
            <p>Comfort</p>
            <input type="radio" id="comfort-1" name="comfort" value="1"></input>
            <label>Uncomfortable</label>
            <input type="radio" id="comfort-2" name="comfort" value="2"></input>
            <input type="radio" id="comfort-3" name="comfort" value="3"></input>
            <input type="radio" id="comfort-4" name="comfort" value="4"></input>
            <input type="radio" id="comfort-5" name="comfort" value="5"></input>
            <label>Perfect</label>
          </div>
        }
        {meta.characteristics.Quality &&
          <div className="reviews-modal-quality-container">
            <p>Quality</p>
            <input type="radio" id="quality-1" name="quality" value="1"></input>
            <label>Poor</label>
            <input type="radio" id="quality-2" name="quality" value="2"></input>
            <input type="radio" id="quality-3" name="quality" value="3"></input>
            <input type="radio" id="quality-4" name="quality" value="4"></input>
            <input type="radio" id="quality-5" name="quality" value="5"></input>
            <label>Perfect</label>
          </div>
        }
        {meta.characteristics.Length &&
          <div className="reviews-modal-length-container">
            <p>Length</p>
            <input type="radio" id="length-1" name="length" value="1"></input>
            <label>Runs short</label>
            <input type="radio" id="length-2" name="length" value="2"></input>
            <input type="radio" id="length-3" name="length" value="3"></input>
            <input type="radio" id="length-4" name="length" value="4"></input>
            <input type="radio" id="length-5" name="length" value="5"></input>
            <label>Runs long</label>
          </div>
        }
        {meta.characteristics.Fit &&
          <div className="reviews-modal-fit-container">
            <p>Fit</p>
            <input type="radio" id="fit-1" name="fit" value="1"></input>
            <label>Runs tight</label>
            <input type="radio" id="fit-2" name="fit" value="2"></input>
            <input type="radio" id="fit-3" name="fit" value="3"></input>
            <input type="radio" id="fit-4" name="fit" value="4"></input>
            <input type="radio" id="fit-5" name="fit" value="5"></input>
            <label>Runs long</label>
          </div>
        }
        </div>
      </div>
    </div>
  )
}