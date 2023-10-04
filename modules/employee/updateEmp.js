const empmodel=require("../../models/employee/employeeSchema");


const updateEmp= async(req,res)=>{

        try {
            const updateUser = await empmodel.findOneAndUpdate(
                { mobile_number:req.body['mobile_number'],active:true,updated_by:req.userId},
                { $set: req.body }, // Dynamically set all fields from req.body
                { new: true } //if true then it returns the updated data
              );
            if(!updateUser){
                res.status(404).send("no such user exists");
            }else{
                res.status(201).send(updateUser);
            }
            
        } catch (error) {
            res.status(500).json({error:error.message})
        }

}

module.exports=updateEmp;