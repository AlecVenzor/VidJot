const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UsersSchema = new Schema({
name:{
    type:String,
    required:true,
},
email:
{
    type:String,
    required:true,
},
date:{
    type:Date,
    default:Date.now
},
password:
{
    type:String,
    required:true
}
});
mongoose.model('users',UsersSchema);