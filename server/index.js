require("dotenv").config();

const express = require('express');
const helper = require('./helpers/api.js');
const path = require("path");
const PORT = process.env.PORT;

const app = express();
// static file serve
app.use(express.json());

// extra imports (body parsers, etc);
app.use(express.static(path.join(__dirname, "../client/dist")));


// routes
app.get('/product', (req, res) => {
  helper.getProduct('', '', (err, products) => {
    if (err) {
      // console.log(err);
      res.sendStatus(400);
    } else {
      // console.log(products);
      res.status(201).send(products);
    }
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});