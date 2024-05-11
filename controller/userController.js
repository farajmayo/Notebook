const User = require('../models/user');
const jwt = require("jsonwebtoken");

// Function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, "Faraz");
}

// Handle user signup
async function handleUserSignup(req, res) {
    const { username, email, password } = req.body;

    try {
        // Check if all fields are filled
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Please fill all the fields."
            });
        }

        // Create user
        const userCreated = await User.create({ username, email, password });
        
        // Create token
        const token = createToken(userCreated._id);

        return res.status(200).json({ token: token, userId: userCreated._id });
    } catch (error) {
        console.error("Signup failed:", error.message);
        return res.status(500).json({ message: "Signup failed. Please try again later." });
    }
}

// Handle user login
async function handleUserLogin(req, res) {
    const { email, password } = req.body;

    try {
        // Login user
        const user = await User.login(email, password);

        // Create token
        const token = createToken(user._id);

        return res.status(200).json({ token: token, userId: user._id });
    } catch (error) {
        console.error("Login failed:", error.message);
        return res.status(500).json({ message: "Login failed. Please check your credentials." });
    }
}

module.exports = { handleUserLogin, handleUserSignup };
