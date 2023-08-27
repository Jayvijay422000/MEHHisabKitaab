const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const studSchema = new Schema({

    active:{
        type:Boolean,
        default:true
    },
    full_name:{
        required:true,
        type:String
    },
    mobile_number:[
        {
        required:true,
        type:String,
        match:[/^\d{10}$/, 'Invalid mobile number. Please enter a 10-digit number.'],
        _id:false
    }
    ],
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
    dob:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true,
        match:[/^[1-9]{1}[0-9]{2}\s{0,1}[0-9]{3}$/,'Invalid pin-code.']
    },
    personal_doc:{
       aadhar_card:{
        type:String,
        default:""
       },
       marksheet:{
        type:String,
        default:""
       } 
    },

    course_details:[{
        course_id:{
            type:Schema.Types.ObjectId ,
            ref:'coursesModel'
        },
        total_fees:{
            type:Number,
            min:0
        },
        DOA:{
            type:Date,
            default:Date.now
        },
        certifcates:{
            type:String,
            default:" "
        },
        fees_installments:[
            {
                DOI:{
                    type:Date,
                    default:Date.now
                },
                amount:{
                    type:Number,
                    min:0
                },
                _id: false 
            }
        ]
    }]


},{collection:"students"})


const studmodel=mongoose.model("studmodel",studSchema)

module.exports=studmodel