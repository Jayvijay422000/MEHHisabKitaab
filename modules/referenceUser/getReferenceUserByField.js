const referenceUserModel = require("../../models/reference/referenceUserSchema")


const getReferenceUserByField = async(req,res)=>{

        try {
            
            const { field , fieldValue } = req.query;
           
            var query={
                    [field]:fieldValue
            }
            
            const refUser = await referenceUserModel.find(query).sort({_id: -1});

            if(!refUser){
            
                res.status(404).send({status: 404, message: "No Data Found", data: null});

            }else{
                res.status(200).send({status: 200, message: "Successfully Found", data: refUser});
            }
    

        } catch (error) {
            
            res.status(500).send({status: 500, message: error.message, data: null});
        }

}

module.exports=getReferenceUserByField