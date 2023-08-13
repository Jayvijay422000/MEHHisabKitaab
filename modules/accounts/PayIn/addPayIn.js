const payInModel = require("../../../models/accounts/payInSchema")


const payIn = async(req,res)=>{


    try {
        
        const { type , amount} = req.body;

        const payin = new payInModel({type,amount});
        const result = await payin.save();
        
        res.json({data:"added successfully"})
        

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports=payIn