const studmodel = require('../../models/students/studentsSchema');

const updateStud= async(req,res)=>{

        try {
           
            const updateUser = await studmodel.findOneAndUpdate(
                { _id:req.body['studId'],_id:req.body['mobile_number'],active:true},
                { $set:req.body, updated_by:req.userId}, // Dynamically set all fields from req.body
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