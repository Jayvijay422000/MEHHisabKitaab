const payInModel = require("../../../models/accounts/payInSchema")


const payIn = async(req,res)=>{


    try {
        
        const { type , amount} = req.body;

        const payin = new payInModel({type,amount,created_by:req.userId});
        const result = await payin.save();
        if(result){
        res.json(result)
        }

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports=payIn