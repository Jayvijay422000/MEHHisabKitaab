const empmodel = require("../../models/employee/employeeSchema");


const getAllEmp = async(req,res)=>{

        try {
            const emp = await empmodel.find().sort({_id: -1});

            if(!emp){
                res.status(404).send({status: 404, message: "No Data Found", data: null});

            }else{
                res.status(200).send({status: 200, message: "Successfully Found", data: emp});

            }
    

        } catch (error) {
            
            res.status(500).send({status: 500, message: error.message, data: null});

        }

}

module.exports=getAllEmp