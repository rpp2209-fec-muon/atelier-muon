import React, { useState, useEffect } from 'react';
import List from './List.jsx';
import NewReviewModal from './NewReviewModal.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import Search from './Search.jsx';
import StarRating from './StarRating.jsx';
const axios = require('axios');

export default function Reviews(props) {

  const [modalState, setModalState] = useState(false);
  const [sortState, setSortState] = useState('relevant');
  const [listState, setListState] = useState([]);
  const [metaState, setMetaState] = useState({});

  var product_id = Number(props.product_id.slice(1));

  // add review get helper function for sending get requests to the server
  const getReviews = () => {
    axios.get('/reviews', {
      params: {
        type: '',
        params: {
          product_id: product_id,
          sort: sortState
        }
      }
    })
      .then((data) => {
        setListState(data.data.results);
      })
      .catch((err) => {
        console.log('error fetching reviews');
      })
  }

  const getMetaData = () => {
    axios.get('/reviews', {
      params: {
        type: '/meta',
        params: {
          product_id: product_id
        }
      }
    })
      .then((data) => {
        setMetaState(data.data);
      })
      .catch((err) => {
        console.log('error fetching metadata');
      })
  }

  // on click handler for closing the new review modal
  const closeModal = () => {
    setModalState(false);
  }


  // useEffect will load a list of reviews for the current product on page load
  useEffect(() => {
    getReviews();
    getMetaData();
  }, []);

  // sorting component will live within Reviews main component,
  // and will control the state that is passed to List

  return (
    <div>
      <div className="reviews-flexParent" data-testid="reviews-parent-div">
        <div className="reviews-flexBreakdownParent">
          <div><b>Ratings and Reviews</b></div>
          {metaState.ratings &&
            <RatingsBreakdown meta={metaState}/>
          }
          {metaState.characteristics &&
            <ProductBreakdown meta={metaState}/>
          }
        </div>

        <div className="reviews-flexListParent">
          <Search />
          <List list={listState}/>
          <button onClick={() => {setModalState(true)}}>Add A Review</button>
        </div>
      </div>
      {modalState &&
        <NewReviewModal closeModal={closeModal}/>
      }
    </div>
  )
}