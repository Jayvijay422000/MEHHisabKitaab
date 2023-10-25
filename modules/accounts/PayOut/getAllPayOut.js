const payOutModel= require("../../../models/accounts/payOutSchema");

const getAllPayOut = async(req,res)=>{

    try {
        const result =await payOutModel.find();

        if(!result){
            res.send({ "status": 404, "message": "No Data Found", "data": null });

        }else{
            res.send({ "status": 200, "message": "successfully Found", "data": result });
        }

    } catch (error) {
        res.send({ "status": 500, "message": error.message, "data": null });

    }
}

module.exports=getAllPayOut