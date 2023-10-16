const payOutModel = require("../../../models/accounts/payOutSchema")


const payOut = async(req,res)=>{


    try {
        
        const { type , description, amount} = req.body;

        const payout = new payOutModel({type,description,amount,created_by:req.userId});
        const result = await payout.save();
        
        res.json(result)
        

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports=payOut