
const EventEmitter = require('events');
const studmodel = require('../../models/students/studentsSchema');
const PayInModel = require('../../models/accounts/payInSchema');

const payInEmitter = new EventEmitter();

// Subscribe to the 'greet' event
payInEmitter.on('addFees', async (description,amount) => {
    const type="Fees";
    const payout = new PayInModel({type,description,amount});
    const result = await payout.save();
    
});


const addFees= async(req,res)=>{

        try {
            const {newFees}=req.body;
            const updateStud = await studmodel.findOneAndUpdate(
                { mobile_number:req.body['mobile_number'],_id:req.body['studId'],active:true,updated_by:req.userId},
                { $push: {"course_details.$.fees_installments":newFees}}, // Dynamically set all fields from req.body
                { new: true }
              );
            if(!updateStud){
                res.status(404).send("no such user exists");
            }else{
                const description = "Installment of "+newFees['amount']+" ₹ paid by "+updateStud["full_name"]+" \n Mobile Number  "+updateStud["mobile_number"][0];
                payInEmitter.emit('addFees',description, newFees['amount']);
                res.status(201).send(updateStud);
            }
            
        } catch (error) {
            res.status(500).json({error:error.message})
        }

}

module.exports=addFees;