const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const referenceUserSchema = new Schema({

    active:{
        type:Boolean,
        default:true
    },
    full_name:{
        required:true,
        type:String
    },
    mobile_number:{
        required:true,
        type:String,
        match:[/^\d{10}$/, 'Invalid mobile number. Please enter a 10-digit number.'],
        _id:false
    }
    ,
    email:{
        type:String,
        required:true,
        match: [/\S+@\S+\.\S+/, 'Invalid email address. Please enter a valid email address.']

    },
    address:{
        type:String,
        required:true
    },
    dob:{
        type:String,
        required:true
    },

    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel', // Reference to the User model (or whichever model represents your users)
      },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel',
      }


},{collection:"referenceUser",timestamps:true})




const referenceUserModel=mongoose.model("referenceUserModel",referenceUserSchema)

module.exports=referenceUserModel