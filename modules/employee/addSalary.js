const empmodel=require("../../models/employee/employeeSchema");
const payOutModel = require("../../models/accounts/payOutSchema");
const EventEmitter = require('events');
const mongoose = require("mongoose");

const payOutEmitter = new EventEmitter();

// Subscribe to the 'greet' event
payOutEmitter.on('addSalary', async (description,amount) => {
    const type="salary";
    const payout = new payOutModel({type,description,amount});
    await payout.save();
    
});

const addSalary= async(req,res)=>{

        try {
            console.log(req.userId)
            const {_id ,newSalary}=req.body;
            const updateUser = await empmodel.findOneAndUpdate(
                { _id:new mongoose.Types.ObjectId(_id),active:true,updated_by:req.userId},
                { $push: {salary:newSalary}}, // Dynamically set all fields from req.body
                { new: true }
              );
            if(!updateUser){
                res.status(404).send({status: 404, message: "No Such User Exist", data: updateUser});

            }else{
                const description = "salary paid to "+updateUser["full_name"]+" \n Mobile Number  "+updateUser["mobile_number"];
                payOutEmitter.emit('addSalary',description, newSalary['amount']);
                res.status(201).send({status: 201, message: "Successfully Updated", data: updateUser});
            }
            
        } catch (error) {
            res.status(500).send({status: 500, message: error.message, data: null});

        }
}

module.exports=addSalary;