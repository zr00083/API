const express = require('express')
const app = express()
const port = process.env.PORT || 3000

//Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Bounty Hunter API'
  });
});

app.listen(port, () => console.log(`Bounty Hunter API listening on port ${port}!`))
