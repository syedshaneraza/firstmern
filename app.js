const dotenv = require('dotenv');
const express = require('express');
const app = express();

dotenv.config({path:'./.env'})
require('./db/index');
app.use(express.json());
// const User = require('./model/userSchema')

app.use(require('./router/auth'));
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log('Server is listening');
})

// Middleware
const middleware = (req, res, next) => {
  console.log('Hello from the middleware');
  next();
}

// app.get('/',(req, res) => {
//   res.send('Hello from the backend');
// })

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
