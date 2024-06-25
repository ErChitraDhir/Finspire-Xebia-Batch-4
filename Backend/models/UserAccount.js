const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAccountSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Create the UserAccount model
const UserAccount = mongoose.model('UserAccount', userAccountSchema);

module.exports = UserAccount;
