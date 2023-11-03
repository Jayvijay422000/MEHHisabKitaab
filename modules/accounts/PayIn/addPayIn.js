const payInModel = require("../../../models/accounts/payInSchema")


const payIn = async(req,res)=>{


    try {
        
        const { type , description, amount} = req.body;

        const payin = new payInModel({type,amount,description,created_by:req.userId});
        const result = await payin.save();
        if(result){
        res.status(201).json({status: 201, message: "added successfully", data: result})
        }

    } catch (error) {
        res.status(500).send({status: 500, message: error.message, data: null});
    }
}

module.exports=payIn