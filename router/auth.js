const express = require("express");
const router = express.Router();

require("../db/index");
const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello from the backend router");
});

router.post("/register", async (req, res) => {
  const { name, email, work, password, cpassword } = req.body;

  if (!name || !email || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Some field is empty" });
  }

  try {
    const userExist = await User.findOne({ email: email })

    if(userExist) {
      return res.status(422).json({ error: "Email already exists" });
    }

    const user = new User({ name, email, work, password, cpassword });
    const userRegister = await user.save()
    
    if (userRegister) {
      res.status(200).json({ message: "Data Successfully Saved" });
    }else {
      res.status(500).json({error: "Failed to register"});
    }
    
  }catch (err) {
    console.log(err)
  }
});

router.post('/login', async (req, res) => {

  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const userLogin = await User.findOne({email:email})
    if (userLogin) {
      res.status(200).json({message: "User logged in successfuly"})
    }else {
      res.status(400).json({error: "Wrong credentials"});
    }
  } catch (error) {
    console.log(error)
  }
})

// router.get('/about',  middleware, (req, res) => {
//   res.send('Hello from the About page');
// })

// router.get('/contact', (req, res) => {
//   res.send('Hello from the contact page');
// })

// router.get('/signup', (req, res) => {
//   res.send('Hello from the signup page');
// })

module.exports = router;
