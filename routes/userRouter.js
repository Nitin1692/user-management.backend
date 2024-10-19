const express = require('express');
const { loginUser, createUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', createUser);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
