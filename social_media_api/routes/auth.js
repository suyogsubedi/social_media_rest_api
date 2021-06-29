const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
// Register
router.post("/register", async (req, res) => {
  try {
    // generatiing or encrypting  password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // creating new user
    const newUser = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    });
    //  save user and return resonse
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
// Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(404).json("User not found");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    !validPassword && res.status(400).json("Wrong password");

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});
module.exports = router;
