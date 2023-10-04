const { models } = require("mongoose");
const payOutModel = require("../../../models/accounts/payOutSchema");


const getPayOutBtnDate = async(req,res)=>{

    try {
        const {startDate,endDate}=req.body;
       
        const result = await payOutModel.find({
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

module.exports=getPayOutBtnDate