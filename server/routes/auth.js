const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const User = require("../models/User");

//multer file upload middleware
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Upload");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// register routes
router.post("/register", upload.single("image"), async (req, res) => {
  // destruture request body
  const { firstname, lastname, email, password } = req.body;
  const image = req.file ? req.file.path : null;
  console.log(image);

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    }

    user = new User({ firstname, lastname, email, password, image });

    // encrypt the password

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(password, salt);

    await user.save();

    return res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    return res.status(500).send("server error");
  }
});

//login routes

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // check User exists
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    //check password matches

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Wrong Password" });
    }

    // Generate sessionID
    req.session.email = user.email;
    console.log("login hit", req.session.email);

    return res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

//AuthChecker Route
router.get("/authChecker", async (req, res) => {
  try {
    if (req.session.email) {
      return res.status(200).json({ valid: true, msg: "Already Logged" });
    } else {
      return res.status(401).json({ valid: false, msg: "UnAuthorized" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
