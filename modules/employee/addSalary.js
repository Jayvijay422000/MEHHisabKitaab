const empmodel=require("../../models/employee/employeeSchema");
const payOutModel = require("../../models/accounts/payOutSchema");
const EventEmitter = require('events');

const payOutEmitter = new EventEmitter();

// Subscribe to the 'greet' event
payOutEmitter.on('addSalary', async (amount) => {
    const type="salary";
    const payout = new payOutModel({type,amount});
    const result = await payout.save();
    
});


const addSalary= async(req,res)=>{

        try {

            const {newSalary}=req.body;


            const updateUser = await empmodel.findOneAndUpdate(
                { mobile_number:req.body['mobile_number'],active:true},
                { $push: {salary:newSalary}}, // Dynamically set all fields from req.body
                { new: true }
              );
            if(!updateUser){
                res.send("no such user exists");
            }else{
                payOutEmitter.emit('addSalary', newSalary['amount']);
                res.status(500).send(updateUser);
            }
            
        } catch (error) {
            res.status(500).json({error:error.message})
        }

}

module.exports=addSalary;