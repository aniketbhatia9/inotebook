const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const JWT_SECRET = "Aniketisagoodboy";

// Create a User using: POST "/api/auth/createuser". No login required. Doesn't require authentication
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user already exists
    try {
      let user = await User.find({ email: req.body.email })
        .then((user) => {
          if (user.length > 0) {
            return res.status(400).json({ error: "User already exists" });
          }
        })
        .catch((err) => {
          console.error(err);
          return res.status(500).send("Internal Server Error");
        });

      const salt = await bcrypt.genSalt(10);
      const secPass= await bcrypt.hash(req.body.password,salt);  
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });

        const data = {
          user: {
            id: user.id,
          },
        };

      const authToken = jwt.sign(data,JWT_SECRET)
      

      res.json({ authToken });
    } catch (error) {
      console.error(error);
      return res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
