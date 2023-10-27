require("dotenv").config();
const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Kolkata'); 


const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PayInSchema = new Schema({

    date:{
        type:Date,
        default: () =>{ return moment(new Date()).tz("Asia/Kolkata").format()}

    },
    type:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    description:{
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

},{

    collection:"AccountsPayIn",timestamps:true
})


const PayInModel = mongoose.model('PayInModel',PayInSchema);

module.exports=PayInModel;