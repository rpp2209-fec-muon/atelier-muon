require("dotenv").config();

const express = require('express');
const helper = require('./helpers/api.js');
const path = require("path");
const PORT = process.env.PORT;

const app = express();
// static file serve

// extra imports (body parsers, etc);
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json());


// routes


app.get('/products', (req, res) => {
  helper.getProduct((err, products) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(products);
    }
  }, req.query.params, req.query.product_id, req.query.type);
});

app.get('/reviews', (req, res) => {
  // console.log(req.query);
  helper.getReview((err, reviews) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).send(reviews);
    }
  }, req.query.params, req.query.type);
})

app.post('/reviews', (req, res) => {
  helper.postReview(req.body, (err) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(201);
    }
  })
})

app.put('/reviews', (req, res) => {
  //helper.putReview
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

module.exports = app;
