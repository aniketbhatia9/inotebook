const express = require("express");
const User = require("../models/User");
const router = express.Router();


// Create a User using: POST "/api/auth/createuser". No login required. Doesn't require authentication
router.post("/", (req, res) => {  
    const user = new User(req.body);
    user.save();
    res.send(req.body);
  
});

module.exports = router;