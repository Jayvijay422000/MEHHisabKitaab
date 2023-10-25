const payInModel = require("../../../models/accounts/payInSchema")


const updatePayIn = async(req,res)=>{


    try {

        const updatePay= await payInModel.findOneAndUpdate(
            { _id:req.body['_id']},
            { $set: req.body,updated_by:req.userId }, // Dynamically set all fields from req.body
            { new: true } //if true then it returns the updated data
          );
        if(!updatePay){
            res.send({"status":404,"message":"No Such User Exist","data":updatePay});

        }else{
            res.send({"status":200,"message":"Successfully Updated","data":updatePay});

        }
       
    } catch (error) {
        res.send({"status":500,"message":error.message,"data":null});
    }
}

module.exports=updatePayIn