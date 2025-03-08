
const mongoose = require("mongoose")

const userschema = mongoose.Schema({
    name:{type:String,trim:true ,required:true},
    age: {type:Number, trim:true, required:true},
    email: {type:String, trim:true,unique:true, required:true},
    password:{type:String, trim:true, required:true},
    Profileimage:{type:String, trim:true}
})

const usermodel = mongoose.model("user_collection", userschema)

module.exports = usermodel

