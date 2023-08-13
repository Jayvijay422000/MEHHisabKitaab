const studmodel = require("../../models/students/studentsSchema");



const getAllStud = async(req,res)=>{

    try {
        
       
        const stud = await studmodel.find();

        if(!stud){
            res.status(404).json({error:"No data"})
        }else{
            res.send(stud);
        }


    } catch (error) {
        
        res.status(500).json({error:error.message});
    }

}

module.exports=getAllStud