const userModel = require('../models/userModel') // Importing the user model
const bcrypt = require('bcrypt') // Importing bcrypt for password hashing
const { generateToken } = require('../utils/generateToken') // Importing token generation utility

// Controller function to register a new user
module.exports.registerUser = async function (req, res) {
    try {
        let { email, password, fullname } = req.body; // Destructuring email, password, and fullname from request body

        // Check if user with the same email already exists
        if (await userModel.findOne({ email: email })) {
            req.flash('error', 'User already have a account Please login !!')
            return res.redirect('/');
        }

        // Generating salt with bcrypt
        bcrypt.genSalt(10, function (err, salt) {
            // Hashing password with generated salt
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);

                // Creating new user with hashed password
                let user = await userModel.create({
                    email,
                    fullname,
                    password: hash,
                });

                // Generating token for the user and setting it in cookie
                let token = generateToken(user);
                res.cookie('token', token);
                res.redirect('/');
            });
        });
    } catch (err) {
        console.log(err.message); // Logging any errors
    }
}

// Controller function to login a user
module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body; // Destructuring email and password from request body

    // Finding user by email in the database
    let user = await userModel.findOne({ email: email });

    // If user does not exist, send error message
    if (!user) {
        req.flash('error', 'email or password is incorrect , Try again !!')
        return res.redirect('/');
    }


    // Comparing hashed password with entered password
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            // Generating token for the user and setting it in cookie
            let token = generateToken(user);
            res.cookie('token', token)
            .redirect('/shop');
        } else {
            // If password does not match, send error message
            req.flash('error', 'email or password is incorrect , Try again !!')
            return res.redirect('/');
        }
    });
}

// Controller function to logout a user
module.exports.logoutUser = async function (req, res) {
    res.cookie('token', '') // Clearing the token cookie
        .redirect('/'); // Sending logout confirmation message
}
