const studmodel = require('../../models/students/studentsSchema');

const updateStud= async(req,res)=>{

        try {
           
            const updateUser = await studmodel.findOneAndUpdate(
                { _id:req.body['studId'],active:true},
                { $set:req.body,updated_by:req.userId}, // Dynamically set all fields from req.body
                { new: true }
              );
              if(!updateUser){
                res.send({"status":404,"message":"No Such User Exist","data":updateUser});
            }else{
                res.send({"status":200,"message":"Successfully Updated","data":updateUser});

            }
            
            
        } catch (error) {

            res.send({"status":500,"message":error.message,"data":null});

        }

}

module.exports=updateStud;