const empmodel = require("../../models/employee/employeeSchema");


const getAllEmp = async(req,res)=>{

        try {
            const emp = await empmodel.find();

            if(!emp){
                res.send({"status":404,"message":"No Data Found","data":null});

            }else{
                res.send({"status":200,"message":"Successfully Found","data":emp});

            }
    

        } catch (error) {
            
            res.send({"status":500,"message":error.message,"data":null});

        }

}

module.exports=getAllEmp