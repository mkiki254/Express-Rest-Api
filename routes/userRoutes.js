const express = require("express");

// Importing controllers
const { 
    registerUser, 
    loginUser, 
    currentUser } = require('../controllers/userController');
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser)

router.post("/login", loginUser)

router.get("/current", validateToken, currentUser) // Where only some of the routes are protected

module.exports = router;