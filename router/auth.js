const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs/dist/bcrypt");
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
    else if (password != cpassword) {
      return res.status(422).json({ error: "password does not match" });
    }
    else
    {
      const user = new User({ name, email, work, password, cpassword });
      const userRegister = await user.save()
      if (userRegister) {
        res.status(200).json({ message: "Data Successfully Saved" });
      }else {
        res.status(500).json({error: "Failed to register"});
      }
    }
    
  }catch (err) {
    console.log(err)
  }
});

router.post('/login', async (req, res) => {
  let token;
  try {
    const {email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill all the fields" });
    }
    const userLogin = await User.findOne({email:email})
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password)
      token = await userLogin.generateAuthToken();
      if (isMatch) {
        res.status(200).json({message: "User logged in successfuly"})
      }else {
        res.status(400).json({error: "Wrong credentials"});
      }
    } else {
      res.status(400).json({error: "Wrong credentials"});
    }
    
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
