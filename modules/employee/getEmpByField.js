const empmodel = require("../../models/employee/employeeSchema");


const getEmpByField = async(req,res)=>{

        try {
            
            const { field , fieldValue } = req.query;

            const query={
                [field]:fieldValue
            }
            const emp = await empmodel.findOne(query);

            if(!emp){
                res.status(404).json({error:"No data"})
            }else{
                res.status(200).send(emp);
            }
    

        } catch (error) {
            
            res.status(500).json({error:error.message});
        }

}

module.exports=getEmpByField