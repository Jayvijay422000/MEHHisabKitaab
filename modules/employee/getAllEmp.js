const empmodel = require("../../models/employee/employeeSchema");


const getAllEmp = async(req,res)=>{

        try {
            
           
            const emp = await empmodel.find();

            if(!emp){
                res.status(404).json({error:"No data"})
            }else{
                res.send(emp);
            }
    

        } catch (error) {
            
            res.status(500).json({error:error.message});
        }

}

module.exports=getAllEmp