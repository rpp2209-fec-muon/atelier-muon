require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;

// static file serve

// extra imports (body parsers, etc);


// routes
app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});