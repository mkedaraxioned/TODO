const dotenv = require('dotenv');
const mongoose = require('mongoose');
// Load env variables
dotenv.config();
//Db address of local database
const DB = process.env.DATABASE_LOCAL;
//User schema
const noteSchema = new mongoose.Schema({
  content:{
    type:String,
    required: [true,'Please Insert the content'],
    unique: true
  },
  status: {
    type:String,
    enum: {
      values:['incomplete','complete'],
      message:'Status should be incomplete or complete'
    },
    default:'incomplete'
  },
  onDate:{
    type:String,
    default:Date.now
  },
  user:String
});

//Model creation
const Note = mongoose.model('Note',noteSchema);

module.exports = Note;
