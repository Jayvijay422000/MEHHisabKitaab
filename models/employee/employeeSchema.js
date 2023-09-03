require("dotenv").config();

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const empSchema = new Schema(
    {
        active:{
            type:Boolean,
            default:true
        },
        full_name :{
            type: String,
            required:true
        },
        mobile_number :{
            type:String,
            required:true,
            match: [/^\d{10}$/, 'Invalid mobile number. Please enter a 10-digit number.']

        },
        dob:{
            type:Date,
            required:true
        },
        email:{
            type:String,
            required:true,
            match: [/\S+@\S+\.\S+/, 'Invalid email address. Please enter a valid email address.']

        },
        address:{
            type:String,
            required:true
        },
        qualification :{
            type:String,
            required:true
        },
        mother_name :{
            type:String,
            required:true
        }, 
        experience :{
            type:Number,
            required:true,
            min:0
        },
       documents:{type:Array,default:[],required:true},
       salary: [
            {
              DOP: {
                type: Date,
                default:Date.now
              },
              amount: {
                type: Number,
                min:0
              },
              _id: false 
            }
          ],
    
          created_by: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'usermodel', // Reference to the User model (or whichever model represents your users)
            },
          updated_by: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'usermodel',
            }
      
          // or => salary : { type : Array , "default" : [] }

    },
    {collection:"employees",timestamps:true})

    const empmodel = mongoose.model("empmodel",empSchema);


    module.exports = empmodel;