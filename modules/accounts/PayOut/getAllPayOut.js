const payOutModel= require("../../../models/accounts/payOutSchema");

const getAllPayOut = async(req,res)=>{

    try {
        const result =await payOutModel.find();

        if(!result){
            res.status(404).json({error:"no data found"})
        }else{
            res.send(result);
        }

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

module.exports=getAllPayOut