const express = require('express');
const router = express.Router();
const bankController = require('../controllers/BankController');
const authMiddleware = require('../middleware/AuthMiddleware');
const isAdmin = require('../middleware/AdminMiddleware');

// Add a new bank account
router.post('/add', authMiddleware, bankController.addBankAccount);

// Get all accounts of the logged-in user
router.get('/my', authMiddleware, bankController.getUserAccounts);

// Update a specific bank account
router.put('/update/:id', authMiddleware, bankController.updateAccount);

// Delete a specific bank account
router.delete('/delete/:id', authMiddleware, bankController.deleteAccount);

// ADMIN: Get all users' bank accounts
router.get('/all', authMiddleware, isAdmin, bankController.getAllAccounts);

module.exports = router;
