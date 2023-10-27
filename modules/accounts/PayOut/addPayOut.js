const payOutModel = require("../../../models/accounts/payOutSchema")


const payOut = async(req,res)=>{


    try {
        
        const { type , description,amount} = req.body;

        const payout = new payOutModel({type,description,amount,created_by:req.userId});
        const result = await payout.save();
        
        res.status(201).send({ status: 201, message: "added successfully", data: result });


    } catch (error) {
        res.status(500).send({ status: 500, message: error.message, data: null });

    }
}

module.exports=payOut