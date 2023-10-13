// Importing async handler
const asyncHandler = require("express-async-handler");
// Importing the user model
const User = require("../models/userModel")
// Importing bcrypt
const bcrypt = require("bcrypt");
// Importing jsonwebtoken
const jwt = require("jsonwebtoken");

// @desc Register a user
// @route POST /api/users/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable){
        res.status(400);
        throw new Error("User already registered!");
    }

    // Converting the raw password into a hashed password using bcrypt library
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Creating the user
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email });
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }

    res.json({message: "Register the User"});
});

// @desc Login a user
// @route POST /api/users/login
// @access public
const loginUser = asyncHandler(async  (req, res) => {
    // When client enters the right email and password
    // We provide them with an accesstoken
    const { email, password } = req.body;
    
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    // Checking whether the user is in the database
    const user = await User.findOne({ email });

    // Compare password with hashedpassword
    if(user && (await bcrypt.compare(password, user.password))){
        const accessToken = jwt.sign({
            // payload
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, 
        // secret key
        process.env.ACCESS_TOKEN_SECRET,
        // Expiration time
        {expiresIn: "15m"}
        );
        res.status(200).json({ accessToken });
    }else{
        res.status(401);
        throw new Error("Email or Password is not valid!")
    }
});

// @desc Current user info
// @route GET /api/users/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser,
}