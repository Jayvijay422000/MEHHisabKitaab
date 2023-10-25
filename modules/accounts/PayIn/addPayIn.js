const payInModel = require("../../../models/accounts/payInSchema")


const payIn = async(req,res)=>{


    try {
        
        const { type , amount} = req.body;

        const payin = new payInModel({type,amount,created_by:req.userId});
        const result = await payin.save();
        if(result){
            res.send({ "status": 200, "message": " Added successfully", "data": result });

        }

    } catch (error) {
        res.send({"status":500,"message":error.message,"data":null});
    }
}

module.exports=payIn