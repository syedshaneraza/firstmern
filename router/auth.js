const express = require('express');
const router = express.Router()

router.get('/',(req, res) => {
  res.send('Hello from the backend router');
})

router.post('/register', (req, res) => {
  console.log(req.body);
  res.json({message: req.body});
})

// router.get('/about',  middleware, (req, res) => {
//   res.send('Hello from the About page');
// })

// router.get('/contact', (req, res) => {
//   res.send('Hello from the contact page');
// })

// router.get('/signin', (req, res) => {
//   res.send('Hello from the signin page');
// })

// router.get('/signup', (req, res) => {
//   res.send('Hello from the signup page');
// })

module.exports = router;
