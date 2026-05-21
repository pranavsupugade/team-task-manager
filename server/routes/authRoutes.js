const express = require("express");

const router = express.Router();

const User = require("../models/User");

router.post("/signup", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({
      message: "Signup Successful"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
      password
    });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Credentials"
      });

    }

    res.json({
      message: "Login Successful",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;