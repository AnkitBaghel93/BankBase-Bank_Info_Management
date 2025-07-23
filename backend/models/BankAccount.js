const mongoose = require('mongoose');

const bankAccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ifscCode: {
    type: String,
    required: true,
    match: /^[A-Z]{4}0[A-Z0-9]{6}$/ 
  },
  branchName: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true,
    match: /^[0-9]{9,18}$/ 
  },
  accountHolderName: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('BankAccount', bankAccountSchema);
