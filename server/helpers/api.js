require("dotenv").config();
const axios = require('axios');

let getProduct = (callback, params, product_id = '', type = '') => {

  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.CAMPUS_CODE}/products${product_id}${type}`,
    headers: {
      'Authorization': process.env.API_KEY
    }
  };
  axios({
    method: 'get',
    url: options.url,
    headers: options.headers,
    params: params
  })
    .then((data) => {
      callback(null, data.data);
    })
    .catch((err) => {
      callback(err, null);
    });

}

let getReview = (callback, params, type = '') => {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.CAMPUS_CODE}/reviews${type}`,
    headers: {
      'Authorization': process.env.API_KEY
    }
  };
  axios({
    method: 'get',
    url: options.url,
    headers: options.headers,
    params: params
  })
    .then((data) => {
      callback(null, data.data);
    })
    .catch((err) => {
      callback(err, null);
    });

}

let postReview = (body, callback) => {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.CAMPUS_CODE}/reviews`,
    headers: {
      'Authorization': process.env.API_KEY
    }
  };

  // TO-DO finish post reviews axios request
  // axios({
  //   method: 'post',
  //   url: options.url,
  //   headers: options.headers,
  //   body: body
  // })
  //   .then((data) => {
  //     callback(null, data.data);
  //   })
  //   .catch((err) => {
  //     callback(err, null);
  //   });
}

let putReview = (type, review_id, callback) => {
  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.CAMPUS_CODE}/reviews${review_id}${type}`,
    headers: {
      'Authorization': process.env.API_KEY
    }
  }
  axios({
    method: 'put',
    url: options.url,
    headers: options.headers,
  })
    .then((data) => {
      callback(null, data.data);
    })
    .catch((err) => {
      callback(err, null);
    });
}

module.exports.getProduct = getProduct;
module.exports.getReview = getReview;
module.exports.postReview = postReview;
module.exports.putReview = putReview;