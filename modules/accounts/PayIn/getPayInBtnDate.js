const { models } = require("mongoose");
const payInModel = require("../../../models/accounts/payInSchema");


const getPayInBtnDate = async(req,res)=>{

    try {
        const {startDate,endDate}=req.body;
       
        const result = await payInModel.find({
            date:{
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });
        res.status(200).send(result);

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}

module.exports=getPayInBtnDate