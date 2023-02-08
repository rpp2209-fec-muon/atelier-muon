require("dotenv").config();

const express = require('express');
const helper = require('./helpers/api.js');
const path = require("path");
const PORT = process.env.PORT;
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  secure: true
});

const app = express();
// static file serve

// extra imports (body parsers, etc);
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use(express.json({limit: '100mb'}));


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

app.post('/cart', (req, res) => {
  helper.postCart(req.body, (err, data) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).send(data);
    }
  })
})

app.post('/interactions', (req, res) => {
  helper.postInteraction(req.body, (err, data) => {
    if (err) {
      res.sendStatus(422);
    } else {
      res.status(201).send(data);
    }
  })
})

app.put('/reviews', (req, res) => {
  //helper.putReview
})

app.post('/reviews/photos', async (req, res) => {
  const image = req.body.data.file;

  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(image, options);
    console.log(result);
    res.status(201).send(result.secure_url);
  } catch (error) {
    console.error(error);
    res.status(500).send('Image upload error!');
  }
})


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});

module.exports = app;
