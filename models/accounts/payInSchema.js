require("dotenv").config();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PayInSchema = new Schema({

    date:{
        type:Date,
        default:Date.now

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