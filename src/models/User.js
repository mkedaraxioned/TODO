const dotenv = require('dotenv');
const mongoose = require('mongoose');
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

//Model creation
const User = mongoose.model('User',userSchema);

module.exports = User;
