const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // exclude by default from queries
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password with stored hash
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};


let User;
try {
  User = mongoose.model('User');
} catch (error) {
  User = mongoose.model('User', userSchema);
}

module.exports = User;