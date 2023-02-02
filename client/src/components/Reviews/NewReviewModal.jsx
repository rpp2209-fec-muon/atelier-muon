import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';

export default function NewReviewModal({ closeModal, meta }) {

  const [rating, setRating] = useState(0);
  const [recommend, setRecommend] = useState(false);
  const [chars, setCharState] = useState({});
  const [photos, setPhotos] = useState([]);
  const [textState, setTextState] = useState({
    summary: '',
    body: '',
    name: '',
    email: ''
  });

  // Star Rating Change Handler
  const handleStarChange = (num) => {
    setRating(num);
    console.log('star', rating);
  }

  // Recommend Change Handler
  const handleRecoChange = (event) => {
    setRecommend(!!event.target.value);
  }

  // Characteristics Change Handler
  const handleCharsChange = (event) => {
    var name = event.target.name;
    var value = Number(event.target.value);

    setCharState(chars => ({
      ...chars,
      [name]: value
    }))
    // console.log('chars', chars);
  }

  // Summary/Body Text Change Handler
  const handleTextChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;

    setTextState(textState => ({
      ...textState,
      [name]: value
    }))
  }

  return (
    <div className='reviews-modalOverlay'>
      <div className='reviews-modalContainer'>

        <StarRating rating={rating} handleChange={handleStarChange}/>

        <p onClick={() => {closeModal()}}>X</p>

        <div className="reviews-modal-recommend-container" onChange={(e) => {handleRecoChange(e)}}>
          <p>Do you recommend this product?</p>
          <input type="radio" id="yes-radio" name="recommend" value={true}></input>
          <label>Yes</label>
          <input type="radio" id="no-radio" name="recommend" value={false}></input>
          <label>No</label>
        </div>

        <div className="reviews-modal-characteristics-container" onChange={(e) => {handleCharsChange(e)}}>
          {meta.characteristics.Size &&
            <div className="reviews-modal-size-container">
              <p>Size</p>
              <input type="radio" id="size-1" name={meta.characteristics.Size.id} value="1"></input>
              <label>A size too small</label>
              <input type="radio" id="size-2" name={meta.characteristics.Size.id} value="2"></input>
              <input type="radio" id="size-3" name={meta.characteristics.Size.id} value="3"></input>
              <input type="radio" id="size-4" name={meta.characteristics.Size.id} value="4"></input>
              <input type="radio" id="size-5" name={meta.characteristics.Size.id} value="5"></input>
              <label>A size too wide</label>
            </div>
          }
          {meta.characteristics.Width &&
            <div className="reviews-modal-width-container">
              <p>Width</p>
              <input type="radio" id="width-1" name={meta.characteristics.Width.id} value="1"></input>
              <label>Too narrow</label>
              <input type="radio" id="width-2" name={meta.characteristics.Width.id} value="2"></input>
              <input type="radio" id="width-3" name={meta.characteristics.Width.id} value="3"></input>
              <input type="radio" id="width-4" name={meta.characteristics.Width.id} value="4"></input>
              <input type="radio" id="width-5" name={meta.characteristics.Width.id} value="5"></input>
              <label>Too wide</label>
            </div>
          }
          {meta.characteristics.Comfort &&
            <div className="reviews-modal-comfort-container">
              <p>Comfort</p>
              <input type="radio" id="comfort-1" name={meta.characteristics.Comfort.id} value="1"></input>
              <label>Uncomfortable</label>
              <input type="radio" id="comfort-2" name={meta.characteristics.Comfort.id} value="2"></input>
              <input type="radio" id="comfort-3" name={meta.characteristics.Comfort.id} value="3"></input>
              <input type="radio" id="comfort-4" name={meta.characteristics.Comfort.id} value="4"></input>
              <input type="radio" id="comfort-5" name={meta.characteristics.Comfort.id} value="5"></input>
              <label>Perfect</label>
            </div>
          }
          {meta.characteristics.Quality &&
            <div className="reviews-modal-quality-container">
              <p>Quality</p>
              <input type="radio" id="quality-1" name={meta.characteristics.Quality.id} value="1"></input>
              <label>Poor</label>
              <input type="radio" id="quality-2" name={meta.characteristics.Quality.id} value="2"></input>
              <input type="radio" id="quality-3" name={meta.characteristics.Quality.id} value="3"></input>
              <input type="radio" id="quality-4" name={meta.characteristics.Quality.id} value="4"></input>
              <input type="radio" id="quality-5" name={meta.characteristics.Quality.id} value="5"></input>
              <label>Perfect</label>
            </div>
          }
          {meta.characteristics.Length &&
            <div className="reviews-modal-length-container">
              <p>Length</p>
              <input type="radio" id="length-1" name={meta.characteristics.Length.id} value="1"></input>
              <label>Runs short</label>
              <input type="radio" id="length-2" name={meta.characteristics.Length.id} value="2"></input>
              <input type="radio" id="length-3" name={meta.characteristics.Length.id} value="3"></input>
              <input type="radio" id="length-4" name={meta.characteristics.Length.id} value="4"></input>
              <input type="radio" id="length-5" name={meta.characteristics.Length.id} value="5"></input>
              <label>Runs long</label>
            </div>
          }
          {meta.characteristics.Fit &&
            <div className="reviews-modal-fit-container">
              <p>Fit</p>
              <input type="radio" id="fit-1" name={meta.characteristics.Fit.id} value="1"></input>
              <label>Runs tight</label>
              <input type="radio" id="fit-2" name={meta.characteristics.Fit.id} value="2"></input>
              <input type="radio" id="fit-3" name={meta.characteristics.Fit.id} value="3"></input>
              <input type="radio" id="fit-4" name={meta.characteristics.Fit.id} value="4"></input>
              <input type="radio" id="fit-5" name={meta.characteristics.Fit.id} value="5"></input>
              <label>Runs long</label>
            </div>
          }
        </div>

        <div className="reviews-modal-summary/body-container">
          <p>Summary</p>
          <input type="text" id="modal-summary" name="summary" placeholder={'Example: Best purchase ever!'} value={textState.summary} maxLength={60} onChange={(e) => {handleTextChange(e)}}></input>
          <p>Body</p>
          <input type="text" id="modal-body" name="body" placeholder={'Why did you like the product or not?'} value={textState.body} maxLength={1000} onChange={(e) => {handleTextChange(e)}}></input>
        </div>

        <div className="reviews-modal-pictures-container">
          <label htmlFor="image-upload">Upload photos</label>
          {photos.length < 5 &&
          <input type="file" id="image-upload" mulitple="true"></input>
          }
        </div>

        <div className="reviews-modal-name/email-container">
          <p>What is your nickname?</p>
          <input type="text" id="modal-name" name="name" placeholder={'Example: jackson11!'} value={textState.name} maxLength={60} onChange={(e) => {handleTextChange(e)}}></input>
          <p>For privacy reasons, do not use your full name or email address</p>

          <p>Your Email</p>
          <input type="text" id="modal-email" name="email" placeholder={'Example: jackson11@email.com'} value={textState.email} maxLength={60} onChange={(e) => {handleTextChange(e)}}></input>
          <p>For authentication reasons, you will not be emailed</p>
        </div>

        <button>Submit Review</button>
      </div>
    </div>
  )
}