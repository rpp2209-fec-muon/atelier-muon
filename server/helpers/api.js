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
  axios({
    method: 'post',
    url: options.url,
    headers: options.headers,
    data: body
  })
    .then((res) => {
      console.log('response from post review', res);
      callback(null, res);
    })
    .catch((err) => {
      console.log('error from post review', err);
      callback(err, null);
    })
}

let postCart = (params, callback) => {

  console.log('what is json', JSON.stringify(params))

  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.CAMPUS_CODE}/cart`,
    headers: {
      'Authorization': process.env.API_KEY
    }
  };
  axios({
    method: 'post',
    url: options.url,
    headers: options.headers,
    data: params,
  })
    .then((data) => {
      console.log('response data from post cart', data)
      callback(null, data.data);
    })
    .catch((err) => {
      callback(err, null);
      console.log(err);
    });
}

let postInteraction = (params, callback) => {

  let options = {
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/${process.env.CAMPUS_CODE}/interactions`,
    headers: {
      'Authorization': process.env.API_KEY
    }
  };
  axios({
    method: 'post',
    url: options.url,
    headers: options.headers,
    data: params,
  })
    .then((data) => {
      callback(null, data.data);
    })
    .catch((err) => {
      callback(err, null);
      console.log(err);
    });
}

let putReview = (callback, type, review_id) => {
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
module.exports.postCart = postCart;
module.exports.postInteraction = postInteraction;