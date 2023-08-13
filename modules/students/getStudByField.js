const studmodel = require("../../models/students/studentsSchema");


const getStudByField = async(req,res)=>{

        try {
            
            const { field , fieldValue } = req.query;

            const query={
                [field]:fieldValue
            }
            const stud = await studmodel.findOne(query);

            if(!stud){
                res.status(404).json({error:"No data"})
            }else{
                res.send(stud);
            }
    

        } catch (error) {
            
            res.status(500).json({error:error.message});
        }

}

module.exports=getStudByField