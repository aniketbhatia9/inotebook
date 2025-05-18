const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchUser");

const JWT_SECRET = "Aniketisagoodboy";

// ROUTE 1 : Create a User using: POST "/api/auth/createuser". No login required. Doesn't require authentication
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

// ROUTE 2 : Authenticate a User using: POST "/api/auth/login". No login required.

router.post(
    '/login',
    [
        body('email', 'Enter a valid email').isEmail(),
        body('password', 'Password cannot be blank').exists()
    ],async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials" });
            }
            const data = {
                user: {
                    id: user.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });
        } catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    })

// ROUTE 3 : Get loggedin User details using: POST "/api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res) => {
try {
    const user = await User.findById(req.user.id).select("-password");
    res.send(user);
} catch (error) {
     console.error(error);
     return res.status(500).send("Internal Server Error");
}
});
module.exports = router;
