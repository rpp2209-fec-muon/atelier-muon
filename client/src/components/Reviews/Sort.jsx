import React, { useState, useEffect } from 'react';

export default function Sort({ handleSortChange }) {

  return (
    <select name="sort" onChange={(e) => { handleSortChange(e.target.value) }}>
      <option value="relevant">Relevant</option>
      <option value="helpful">Helpful</option>
      <option value="newest">Newest</option>
    </select>
  )
}