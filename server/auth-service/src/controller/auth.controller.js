const bcrypt = require("bcryptjs");
const User = require("../models/model"); // Mongoose model import
const { generateToken } = require("../utils/jwt.utils");

// Register User
const register = async (req, res) => {
  try {
    const { first_name, last_name, phone_number, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user document
    const newUser = new User({
      first_name,
      last_name,
      phone_number,
      email,
      password: hashedPassword,
    });

    // Save new user to MongoDB
    await newUser.save();

    // Prepare user data for event publishing
    const userData = { email: newUser.email, first_name: newUser.first_name };

    // Send success response
    return res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in register:", error);
    return res.status(500).json({ message: "Error registering user" });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for user
    const token = generateToken(user.id);

    // Send response with token
    return res.json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Error logging in" });
  }
};

module.exports = { register, login };
