const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const { protect } = require("../middleware/authmidleware");
const User = require("../models/userModel");
const generateToken = require("../util/generateToken");
const router = express.Router();

router.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: "invalid ID and pass" });
    }
  })
);

router.get(
  "/profile/:name",
  protect,
  expressAsyncHandler(async (req, res) => {
    const user = await User.find({ name: req.params.name }).select({
      name: 1,
      email: 1,
    });
    console.log(user);
    // if (user) {
    res.status(200).json(user);
    // } else {
    //   res.status(404).json({ message: "user not found" });
    // }
  })
);

router.put(
  "/profile/:id",
  protect,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

router.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  })
);
router.get(
  "/forget",
  expressAsyncHandler((req, res) => {})
);

module.exports = router;
