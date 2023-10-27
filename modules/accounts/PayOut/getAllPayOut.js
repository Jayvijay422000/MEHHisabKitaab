const payOutModel= require("../../../models/accounts/payOutSchema");

const getAllPayOut = async(req,res)=>{

    try {
        const result =await payOutModel.find();

        if(!result){
            res.status(404).send({ status: 404, message: "No Data Found", data: null });

        }else{
            res.status(200).send({ status: 200, message: "successfully Found", data: result });
        }

    } catch (error) {
        res.status(500).send({ status: 500, message: error.message, data: null });

    }
}

module.exports=getAllPayOut