const studmodel = require('../../models/students/studentsSchema');

const updateStud= async(req,res)=>{

        try {
           
            const updateUser = await studmodel.findOneAndUpdate(
                { mobile_number:req.body['mobile_number'],_id:req.body['studId'],active:true,updated_by:req.userId},
                { $set:req.body}, // Dynamically set all fields from req.body
                { new: true }
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

module.exports=updateStud;