require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT;
const path = require('path');

// static file serve
app.use(express.static(path.join(__dirname, '../client/dist')));
// extra imports (body parsers, etc);


// routes

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
});