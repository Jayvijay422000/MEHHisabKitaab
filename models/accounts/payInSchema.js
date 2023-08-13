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
    }
},{

    collection:"AccountsPayIn"
})


const PayInModel = mongoose.model('PayInModel',PayInSchema);

module.exports=PayInModel;