const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const dotenv = require('dotenv').config()

// User registration endpoint
module.exports.register = async function (req, res) {
	try {
		const { username, email, password } = req.body;

		// Validate input parameters
		if (!username|| !email|| !password) {
			return res.status(400).send({ message: "Please provide username, email, and password" });
		}

		// Check if the user with the provided email already exists
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).send({ message: "Email already exists!" });
		}

		// Hash the user's password before storing it in the database
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user in the database
		const newUser = await User.create({
			username,
            email,
			password: hashedPassword,
		});

		// Generate a JWT token for the newly created user
		const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });
        res.cookie("token",token);
		// Return success response with the token
		return res.status(201).send({ token, message: "User created successfully" });
	} catch (error) {
		// Handle errors during user registration
		console.error("Error in signUp:", error);
		return res.status(500).send({ message: "Internal Server Error" });
	}
};

// User login endpoint
module.exports.login = async function (req, res) {
	const { email, password } = req.body;

	try {
		// Validate presence of email and password in the request
		if (email && password) {
			// Find the user with the provided email
			const user = await User.findOne({ email });

			// If no user found, return an authentication error
			if (!user) {
				return res.status(401).send({ message: "Invalid email or password" });
			}

			// Compare the provided password with the stored hashed password
			const passwordMatch = await bcrypt.compare(password, user.password);

			// If passwords don't match, return an authentication error
			if (!passwordMatch) {
				return res.status(401).send({ message: "Invalid email or password" });
			}

			// Generate a JWT token for the authenticated user
			const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" });

			// Return success response with the token
			return res.status(200).send({ token, message: "Authentication successful" });
		} else {
			// If email or password is missing, return a bad request error
			return res.status(400).send({ message: "Please provide email and password" });
		}
	} catch (error) {
		// Handle errors during user login
		console.error("Error in signIn:", error);
		return res.status(500).send({ message: "Internal Server Error" });
	}
};