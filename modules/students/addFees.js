
const EventEmitter = require('events');
const studmodel = require('../../models/students/studentsSchema');
const PayInModel = require('../../models/accounts/payInSchema');
const mongoose = require("mongoose");

const payInEmitter = new EventEmitter();

// Subscribe to the 'greet' event
payInEmitter.on('addFees', async (description,amount) => {
    const type="Fees";
    const payout = new PayInModel({type,description,amount});
    const result = await payout.save();
    
});


const addFees= async(req,res)=>{

        try {
            const {studId,newFees,course_id}=req.body;


            const updateStud = await studmodel.findOneAndUpdate(
                { _id:studId,active:true, "course_details.course_id":new mongoose.Types.ObjectId(course_id)},
                { $push: {"course_details.$.fees_installments":newFees}}, // Dynamically set all fields from req.body
                { new: true }
              );
            if(!updateStud){
                res.send({"status":404,"message":"No Such User Exist","data":updateUser});
            }else{
                const description = "Installment paid by "+updateStud["full_name"]+" \n Mobile Number  "+updateStud["mobile_number"][0];
                payInEmitter.emit('addFees',description, newFees['amount'])
               
                res.send({"status":200,"message":"Fees Added Successfully","data":updateUser});
            }
            
        } catch (error) {
            res.send({"status":500,"message":error.message,"data":null});

        }

}

module.exports=addFees;