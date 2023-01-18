import React, { useState, useEffect } from "react";
const axios = require('axios');


export default function App() {

  useEffect(() => {
    axios.get('/product')
      .then((data => console.log(data)))
      .catch((err => console.log(err)));

  }, []);

  return (
    <div></div>
  );
}