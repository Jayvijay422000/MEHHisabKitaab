const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const userSchema = new Schema({
    active:{
        type:Boolean,
        default:true
    },
    uid:{
        type:Schema.Types.ObjectId,
        ref:'empmodel'
    },
    email:{
        type:String,
        required:true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address. Please enter a valid email address.']
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["staff","admin","student"]
    },
    mobile_number:{
        type:String,
        required:true,
        match: [/^\d{10}$/, 'Invalid mobile number. Please enter a 10-digit number.']

    }


},{collection:"userlogin",timestamps:true})


const userModel = mongoose.model("usermodel",userSchema)

module.exports=userModel