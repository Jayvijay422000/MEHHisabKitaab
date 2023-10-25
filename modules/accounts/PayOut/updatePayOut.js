const payOutModel = require("../../../models/accounts/payOutSchema")


const updatePayOut = async(req,res)=>{


    try {

        const updatePayOut= await payOutModel.findOneAndUpdate(
            { _id:req.body['_id']},
            { $set: req.body,updated_by:req.userId }, // Dynamically set all fields from req.body
            { new: true } //if true then it returns the updated data
          );
        if(!updatePayOut){
            res.send({"status":404,"message":"No Such User Exist","data": updatePayOut});

        }else{
            res.send({"status":200,"message":"Successfully Updated","data":updatePayOut});

        }
       
    } catch (error) {
        res.send({"status":500,"message":error.message,"data":null});
    }
}

module.exports=updatePayOut