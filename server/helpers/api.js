require("dotenv").config();
const axios = require('axios');

let getProduct = (product_id, url, callback) => {


  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/rpp/products/`,
    headers: {
      'Authorization': `${process.env.API_KEY}`
    }
  };
  axios.get(options.url, options.headers)
    .then((data) => {
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
    });

}

module.exports.getProduct = getProduct;