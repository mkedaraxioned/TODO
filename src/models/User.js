const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Load env variables
dotenv.config();
//Db address of local database
const DB = process.env.DATABASE_LOCAL;
//User schema
const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required: [true,'Please Insert the name'],
    unique: true
  },
  email: {
    type:String,
    required: [true,'Enter the email field']
  },
  password:{
    type:String,
    required: [true,'Please enter the password']
  }
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Model creation
const User = mongoose.model('User',userSchema);

module.exports = User;
