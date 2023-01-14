const express = require('express');
const app = express();
const port = 3000;

// static file serve

// extra imports (body parsers, etc);


// routes
app.get('/', (req, res) => {
  res.send('Hello World');
})

app.listen(port, () => {
  console.log(`listening on ${port}`)
});