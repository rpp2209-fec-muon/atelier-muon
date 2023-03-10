import React, { useState, useEffect } from 'react';
import StarRating from './StarRating.jsx';
const axios = require('axios');

export default function NewReviewModal({ closeModal, product_id, meta }) {

  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [chars, setCharState] = useState({});
  const [recommend, setRecommend] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadFailure, setUploadFailure] = useState(false);
  const [textState, setTextState] = useState({
    summary: '',
    body: '',
    name: '',
    email: ''
  });

  // Star Rating Change Handler
  const handleStarChange = (num) => {
    setRating(num);
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
  }

  // Text Field Change Handler
  const handleTextChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;

    setTextState(textState => ({
      ...textState,
      [name]: value
    }))
  }

  // Image Add Handler
  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadSuccess(false);
  }

  // Image Upload Handler
  const onFileUpload = () => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const base64 = reader.result;

      axios.post('reviews/photos', {
        data: {
          file: base64
        }
      })
        .then((response) => {
          setPhotos(photos => ([...photos, response.data]));
          setUploadSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setUploadFailure(true);
        })
    }
    reader.readAsDataURL(selectedFile);
  }

  // Form Submission Handler
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(event);

    axios.post('/reviews', {
      product_id: product_id,
      rating: rating,
      summary: textState.summary,
      body: textState.body,
      recommend: recommend,
      name: textState.name,
      email: textState.email,
      photos: photos,
      characteristics: chars
    })
      .then((response) => {
        // tell user of success, close modal
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className='reviews-modalOverlay'>
      <div className='reviews-modalContainer'>
        <p onClick={() => {closeModal()}}>X</p>
        <form onSubmit={(e) => {handleFormSubmit(e)}}>
          <p>Overall Rating*</p>

          <StarRating rating={rating} handleChange={handleStarChange}/>

          <div className="reviews-modal-recommend-container" onChange={(e) => {handleRecoChange(e)}}>
            <p>Do you recommend this product?*</p>
            <input type="radio" id="yes-radio" name="recommend" value={true} required></input>
            <label htmlFor="yes-radio">Yes</label>
            <input type="radio" id="no-radio" name="recommend" value={false}></input>
            <label htmlFor="no-radio">No</label>
          </div>

          <div className="reviews-modal-characteristics-container" onChange={(e) => {handleCharsChange(e)}}>
            <p>Characteristics</p>
            {meta.characteristics.Size &&
              <div className="reviews-modal-size-container">
                <p>Size*</p>
                <label htmlFor="size-1">A size too small</label>
                <input type="radio" id="size-1" name={meta.characteristics.Size.id} value="1" required></input>
                <input type="radio" id="size-2" name={meta.characteristics.Size.id} value="2"></input>
                <input type="radio" id="size-3" name={meta.characteristics.Size.id} value="3"></input>
                <input type="radio" id="size-4" name={meta.characteristics.Size.id} value="4"></input>
                <input type="radio" id="size-5" name={meta.characteristics.Size.id} value="5"></input>
                <label htmlFor="size-5">A size too wide</label>
              </div>
            }
            {meta.characteristics.Width &&
              <div className="reviews-modal-width-container">
                <p>Width*</p>
                <label htmlFor="width-1">Too narrow</label>
                <input type="radio" id="width-1" name={meta.characteristics.Width.id} value="1" required></input>
                <input type="radio" id="width-2" name={meta.characteristics.Width.id} value="2"></input>
                <input type="radio" id="width-3" name={meta.characteristics.Width.id} value="3"></input>
                <input type="radio" id="width-4" name={meta.characteristics.Width.id} value="4"></input>
                <input type="radio" id="width-5" name={meta.characteristics.Width.id} value="5"></input>
                <label htmlFor="width-5">Too wide</label>
              </div>
            }
            {meta.characteristics.Comfort &&
              <div className="reviews-modal-comfort-container">
                <p>Comfort*</p>
                <label htmlFor="comfort-1">Uncomfortable</label>
                <input type="radio" id="comfort-1" name={meta.characteristics.Comfort.id} value="1" required></input>
                <input type="radio" id="comfort-2" name={meta.characteristics.Comfort.id} value="2"></input>
                <input type="radio" id="comfort-3" name={meta.characteristics.Comfort.id} value="3"></input>
                <input type="radio" id="comfort-4" name={meta.characteristics.Comfort.id} value="4"></input>
                <input type="radio" id="comfort-5" name={meta.characteristics.Comfort.id} value="5"></input>
                <label htmlFor="comfort-5">Perfect</label>
              </div>
            }
            {meta.characteristics.Quality &&
              <div className="reviews-modal-quality-container">
                <p>Quality*</p>
                <label htmlFor="quality-1">Poor</label>
                <input type="radio" id="quality-1" name={meta.characteristics.Quality.id} value="1" required></input>
                <input type="radio" id="quality-2" name={meta.characteristics.Quality.id} value="2"></input>
                <input type="radio" id="quality-3" name={meta.characteristics.Quality.id} value="3"></input>
                <input type="radio" id="quality-4" name={meta.characteristics.Quality.id} value="4"></input>
                <input type="radio" id="quality-5" name={meta.characteristics.Quality.id} value="5"></input>
                <label htmlFor="quality-5">Perfect</label>
              </div>
            }
            {meta.characteristics.Length &&
              <div className="reviews-modal-length-container">
                <p>Length*</p>
                <label htmlFor="length-1">Runs short</label>
                <input type="radio" id="length-1" name={meta.characteristics.Length.id} value="1" required></input>
                <input type="radio" id="length-2" name={meta.characteristics.Length.id} value="2"></input>
                <input type="radio" id="length-3" name={meta.characteristics.Length.id} value="3"></input>
                <input type="radio" id="length-4" name={meta.characteristics.Length.id} value="4"></input>
                <input type="radio" id="length-5" name={meta.characteristics.Length.id} value="5"></input>
                <label htmlFor="length-5">Runs long</label>
              </div>
            }
            {meta.characteristics.Fit &&
              <div className="reviews-modal-fit-container">
                <p>Fit*</p>
                <label htmlFor="fit-1">Runs tight</label>
                <input type="radio" id="fit-1" name={meta.characteristics.Fit.id} value="1" required></input>
                <input type="radio" id="fit-2" name={meta.characteristics.Fit.id} value="2"></input>
                <input type="radio" id="fit-3" name={meta.characteristics.Fit.id} value="3"></input>
                <input type="radio" id="fit-4" name={meta.characteristics.Fit.id} value="4"></input>
                <input type="radio" id="fit-5" name={meta.characteristics.Fit.id} value="5"></input>
                <label htmlFor="fit-1">Runs long</label>
              </div>
            }
          </div>

          <div className="reviews-modal-summary/body-container">
            <p>Summary</p>
            <input type="text" id="modal-summary" name="summary" placeholder={'Example: Best purchase ever!'} value={textState.summary} maxLength={60} onChange={(e) => {handleTextChange(e)}}></input>
            <p>Body*</p>
            <input type="text" id="modal-body" name="body" placeholder={'Why did you like the product or not?'} value={textState.body} minLength={50} maxLength={1000} onChange={(e) => {handleTextChange(e)}} required></input>
          </div>

          <div className="reviews-modal-pictures-container">
            <label htmlFor="image-upload">Add Photo</label>
            <input type="file" id="image-upload" onChange={(e) => {onFileChange(e)}}></input>
            {photos.length < 5 &&
            <button onClick={() => {onFileUpload()}}>Upload Photo</button>
            }
            {uploadSuccess &&
              <p>Photo Uploaded Successfully!</p>
            }
            {uploadFailure &&
              <p>Photo Upload Error! Please try again.</p>
            }
          </div>

          <div className="reviews-modal-name/email-container">
            <p>What is your nickname?*</p>
            <input type="text" id="modal-name" name="name" placeholder={'Example: jackson11!'} value={textState.name} maxLength={60} onChange={(e) => {handleTextChange(e)}} required></input>
            <p>For privacy reasons, do not use your full name or email address</p>

            <p>Your Email*</p>
            <input type="email" id="modal-email" name="email" placeholder={'Example: jackson11@email.com'} value={textState.email} maxLength={60} onChange={(e) => {handleTextChange(e)}} required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"></input>
            <p>For authentication reasons, you will not be emailed</p>
          </div>

          <input type="submit" value="Submit Review"></input>
        </form>
      </div>
    </div>
  )
}