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

//Including routes
const userRoutes = require('./routes/users');

// to support JSON-encoded bodies
app.use(express.json());
// to support URL-encoded bodies
app.use(express.urlencoded({extended:true}));

app.use('/assets',express.static('assets/images'));

//Use routes
app.use('/users/', userRoutes);

//Root route with just a basic response to let people know this is the API
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Bounty Hunter API'
  });
});

app.get('*', function(req, res){
  res.status(404).send({message:"Resource not found"});
});

//start express listening on the port and just log it to the console.
app.listen(PORT, () => console.log(`Bounty Hunter API listening on port ${PORT}!`))
