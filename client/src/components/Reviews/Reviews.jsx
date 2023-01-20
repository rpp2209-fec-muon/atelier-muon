import React, { useState, useEffect } from 'react';
import List from './List.jsx';
import NewReview from './NewReview.jsx';
import ProductBreakdown from './ProductBreakdown.jsx';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import Search from './Search.jsx';

export default function Reviews() {

  const [formState, setFormState] = useState(false);

  // useEffect will load a list of reviews for the current product on page load

  // sorting component will live within Reviews main component,
  // and will control the state that is passed to List

  return (
    <div>
      <div>Ratings and Reviews</div>
      <Search />
      <List />
      <ProductBreakdown />
      <RatingsBreakdown />
      {formState &&
        <NewReview />
      }
    </div>
  )
}