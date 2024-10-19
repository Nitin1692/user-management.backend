const User = require('../models/User')
const {success,error} = require('../utils/responseWrapper')

// Create a new user (Registration)
const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.send(error(409, "User is already registered"));
        }
        const user = new User({ name, email, password });
        await user.save();
        return res.send(success(201, 'User created successfully'))
    } catch (e) {
        return res.send(error(500, e));
    }
};

// Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.send(success(200,users))
    } catch (e) {
        return res.send(error(500, e));
    }
};

// Login user by email and password
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.send(error(404, 'User not Found'));
        }

        // Check if password matches
        if (user.password !== password) {
            return res.send(error(403, "Incorrect password"));
        }

        // If both email and password are correct, send the user data
        return res.send(success(200,user))
    } catch (e) {
        return res.send(error(500, e));
    }
};



// Update a user
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) return res.send(error(404, 'User not Found'));
        return res.send(success(200, updateUser));
    } catch (e) {
        return res.send(error(500, e));
    }
};

// Delete a user
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.send(error(404, 'User not Found'));
        return res.send(success(201, 'User deleted successfully'));
    } catch (e) {
        return res.send(error(500, e));
    }
};

module.exports = { createUser, getAllUsers, updateUser, loginUser, deleteUser };