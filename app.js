const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const app = express();

dotenv.config({path:'./.env'})

const DB = process.env.DATABASE;

app.listen(5000, () => {
  console.log('Server is listening');
})

mongoose.connect(DB, {
  useNewUrlParser:true,
  useUnifiedTopology:true
}).then(() => {
  console.log('connection successful');
}).catch((err) => console.log('not connected'));

// Middleware
const middleware = (req, res, next) => {
  console.log('Hello from the middleware');
  next();
}

app.get('/',(req, res) => {
  res.send('Hello from the backend');
})

app.get('/about',  middleware, (req, res) => {
  res.send('Hello from the About page');
})

app.get('/contact', (req, res) => {
  res.send('Hello from the contact page');
})

app.get('/signin', (req, res) => {
  res.send('Hello from the signin page');
})

app.get('/signup', (req, res) => {
  res.send('Hello from the signup page');
})
