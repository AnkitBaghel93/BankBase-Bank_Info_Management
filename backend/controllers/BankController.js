const BankAccount = require('../models/BankAccount');
const User = require('../models/User'); // Import User model to get usernames

exports.addBankAccount = async (req, res) => {
  try {
    const { ifscCode, branchName, bankName, accountNumber, accountHolderName } = req.body;
    const userId = req.user.id;

    if (!ifscCode || !branchName || !bankName || !accountNumber || !accountHolderName) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newAccount = new BankAccount({
      user: userId,
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName
    });

    await newAccount.save();
    res.status(201).json({ message: 'Bank account added successfully', data: newAccount });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserAccounts = async (req, res) => {
  try {
    const userId = req.user.id;
    const accounts = await BankAccount.find({ user: userId });
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Get all accounts of logged-in user
exports.getAccounts = async (req, res) => {
  try {
    const accounts = await BankAccount.find({ user: req.user.id });
    res.status(200).json(accounts);
  } catch {
    res.status(500).json({ message: 'Failed to fetch accounts' });
  }
};

// Delete an account
exports.deleteAccount = async (req, res) => {
  try {
    await BankAccount.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Account deleted' });
  } catch {
    res.status(500).json({ message: 'Failed to delete account' });
  }
};

// Update account
exports.updateAccount = async (req, res) => {
  try {
    const account = await BankAccount.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(account);
  } catch {
    res.status(500).json({ message: 'Failed to update account' });
  }
};




// Get all bank accounts (admin only)
exports.getAllAccounts = async (req, res) => {
  try {
    const { username, ifscCode, bankName } = req.query;

    // Build user filter
    let userFilter = {};
    if (username) {
      const user = await User.findOne({ username });
      if (user) userFilter.user = user._id;
      else return res.status(404).json({ message: 'No user with that username' });
    }

    // Build account filter
    let accountFilter = {};
    if (ifscCode) accountFilter.ifscCode = ifscCode;
    if (bankName) accountFilter.bankName = bankName;

    // Combine filters
    const combinedFilter = { ...userFilter, ...accountFilter };

    // Fetch accounts with sort by most recent
    const accounts = await BankAccount.find(combinedFilter)
      .populate('user', 'username email')
      .sort({ createdAt: -1 }); // 👈 Sort by most recent first

    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

