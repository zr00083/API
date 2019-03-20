/////////////////////////////////////
// Bounty Hunter API
// 2019
// COM2027 - Group 15
/////////////////////////////////////

//set port to either the deployment port or 3000 for development
const PORT = process.env.PORT || 8080

//Including the express app
const express = require('express');
const app = express();
const Sequelize = require('sequelize');

//Root route with just a basic response to let people know this is the API
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Bounty Hunter API'
  });
});


app.get('/dbtest', (req, res) => {
  const sequelize = new Sequelize({dialect: 'mysql'});
  sequelize
  .authenticate()
  .then(() => {
    res.status(200).send('Connection has been established successfully.');
  })
  .catch(err => {
    res.status(500).send('Unable to connect to the database:');
  });
});


//start express listening on the port and just log it to the console.
app.listen(PORT, () => console.log(`Bounty Hunter API listening on port ${PORT}!`))
