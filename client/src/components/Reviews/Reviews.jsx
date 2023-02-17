import React, { useState, useEffect } from 'react';
import List from './List.jsx';
import NewReviewModal from './NewReviewModal.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import Search from './Search.jsx';
import StarRating from './StarRating.jsx';
import Sort from './Sort.jsx';
const axios = require('axios');

export default function Reviews(props) {

  const [pageState, setPageState] = useState(2);
  const [listState, setListState] = useState([]);
  const [metaState, setMetaState] = useState({});
  const [modalState, setModalState] = useState(false);
  const [sortState, setSortState] = useState('relevant');

  var product_id = Number(props.product_id.slice(1));

  // add review get helper function for sending get requests to the server
  const getReviews = (sortCriteria) => {
    axios.get('/reviews', {
      params: {
        type: '',
        params: {
          product_id: product_id,
          sort: sortCriteria,
          count: 1000
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

  const getAverageRating = (ratings) => {
    var scoreTotal = 0;
    var totalResponses = 0;
    for (let num in ratings) {
      if (ratings[num] === undefined) {
        continue;
      } else {
        scoreTotal += (ratings[num] * (parseInt(num)));
        totalResponses += (parseInt(ratings[num]));
      }
    }
    return Math.round((scoreTotal / totalResponses) * 10) / 10;
  }

  // on click handler for closing the new review modal
  const closeModal = () => {
    setModalState(false);
  }

  const handleSortChange = (criteria) => {
    setSortState(criteria);
    getReviews(criteria);
  }


  // useEffect will load a list of reviews for the current product on page load
  useEffect(() => {
    getReviews(sortState);
    getMetaData();
  }, []);

  // sorting component will live within Reviews main component,
  // and will control the state that is passed to List

  return (
    <div id='reviews-component' onClick={props.onClick}>
      <div className="reviews-flexParent" data-testid="reviews-parent-div">
        <div className="reviews-flexBreakdownParent">
          <div><h1>Ratings and Reviews</h1></div>
          {metaState.ratings &&
            <RatingsBreakdown meta={metaState} getAverageRating={getAverageRating}/>
          }
          {metaState.characteristics &&
            <ProductBreakdown meta={metaState}/>
          }
        </div>

        <div className="reviews-flexListParent">
          <Sort handleSortChange={handleSortChange}/>
          <List list={listState.slice(0, pageState)}/>
          <div className='button-parent'>
            <div className='modal-button-parent'>
              <button onClick={() => {setModalState(true)}} className='modal-button'>Add A Review</button>
            </div>
            <div className='more-reviews-parent'>
              <button className='more-reviews-button' onClick={() => {setPageState(pageState + 2)}}>More Reviews</button>
            </div>
          </div>
        </div>
      </div>
      {modalState &&
        <NewReviewModal closeModal={closeModal} product_id={product_id} meta={metaState}/>
      }
    </div>
  )
}