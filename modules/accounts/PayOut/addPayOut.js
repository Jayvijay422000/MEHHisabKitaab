const payOutModel = require("../../../models/accounts/payOutSchema")


const payOut = async(req,res)=>{


    try {
        
        const { type , description,amount} = req.body;

        const payout = new payOutModel({type,description,amount,created_by:req.userId});
        const result = await payout.save();
        
        res.send({ "status": 200, "message": "added successfully", "data": result });


    } catch (error) {
        res.send({ "status": 500, "message": error.message, "data": null });

    }
}

module.exports=payOut