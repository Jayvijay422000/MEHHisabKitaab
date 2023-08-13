require("dotenv").config();

const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const PayOutSchema = new Schema({

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

    collection:"AccountsPayOut"
})


const PayOutModel = mongoose.model('PayOutModel',PayOutSchema);

module.exports=PayOutModel