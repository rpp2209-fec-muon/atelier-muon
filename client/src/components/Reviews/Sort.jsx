import React, { useState, useEffect } from 'react';

export default function Sort() {

  return (
    <select name="sort">
      <option value="relevant">Relevant</option>
      <option value="helpful">Helpful</option>
      <option value="newest">Newest</option>
    </select>
  )
}