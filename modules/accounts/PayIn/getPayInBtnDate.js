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

        res.status(200).send({ status: 200, message: "successfully Found", data: result });

    } catch (error) {
        res.status(500).send({ status: 500, message: error.message, data: null });

    }
}

module.exports=getPayInBtnDate