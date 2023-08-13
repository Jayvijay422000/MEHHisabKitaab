const payOutModel = require("../../../models/accounts/payOutSchema")


const payOut = async(req,res)=>{


    try {
        
        const { type , amount} = req.body;

        const payout = new payOutModel({type,amount});
        const result = await payout.save();
        
        res.json({data:"added successfully"})
        

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports=payOut