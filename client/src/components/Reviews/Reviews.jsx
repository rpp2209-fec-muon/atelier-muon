import React, { useState, useEffect } from 'react';
import List from './List.jsx';
import NewReview from './NewReview.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import Search from './Search.jsx';
const axios = require('axios');

export default function Reviews(props) {

  const [formState, setFormState] = useState(false);
  const [sortState, setSortState] = useState('relevant');
  const [listState, setListState] = useState([])

  // add review get helper function for sending get requests to the server
  const getReviews = () => {
    var product_id = Number(props.product_id.slice(1));
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
        console.log('error fetching data');
      })
  }


  // useEffect will load a list of reviews for the current product on page load
  useEffect(() => {
    getReviews();
  }, []);

  // sorting component will live within Reviews main component,
  // and will control the state that is passed to List

  return (
    <div>
      <h2>Ratings and Reviews</h2>
      <Search />
      <List list={listState}/>
      <ProductBreakdown />
      <RatingsBreakdown />
      {formState &&
        <NewReview />
      }
    </div>
  )
}