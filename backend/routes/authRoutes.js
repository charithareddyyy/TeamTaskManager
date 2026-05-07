const express = require("express");
const router = express.Router();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


// REGISTER
router.post("/register", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // CHECK USER
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt);

        // CREATE USER
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            user,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Registration Failed",
        });
    }
});



// LOGIN
router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "User not found",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password",
            });
        }

        const token = jwt.sign(
            { id: user._id },
            "secretkey",
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            token,
            user,
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Login Failed",
        });
    }
});

module.exports = router;