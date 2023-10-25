const empmodel=require("../../models/employee/employeeSchema");
const payOutModel = require("../../models/accounts/payOutSchema");
const EventEmitter = require('events');

const payOutEmitter = new EventEmitter();

// Subscribe to the 'greet' event
payOutEmitter.on('addSalary', async (description,amount) => {
    const type="salary";
    const payout = new payOutModel({type,description,amount});
    const result = await payout.save();
    
});


const addSalary= async(req,res)=>{

        try {
            const {newSalary}=req.body;
            const updateUser = await empmodel.findOneAndUpdate(
                { _id:req.body['_id'],active:true},
                { $push: {salary:newSalary,updated_by:req.userId}}, // Dynamically set all fields from req.body
                { new: true }
              );
            if(!updateUser){
                res.send({"status":404,"message":"No Such User Exist","data":updateUser});

            }else{
                const description = "salary paid to "+updateUser["full_name"]+" \n Mobile Number  "+updateUser["mobile_number"];
                payOutEmitter.emit('addSalary',description, newSalary['amount']);
                res.send({"status":200,"message":"Successfully Updated","data":updateUser});

            }
            
        } catch (error) {
            res.send({"status":500,"message":error.message,"data":null});

        }

}

module.exports=addSalary;