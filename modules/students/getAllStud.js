const studmodel = require("../../models/students/studentsSchema");



const getAllStud = async(req,res)=>{

    try {
        
       
        const stud = await studmodel.find();

        if(!stud){
            res.send({"status":404,"message":"No Data Found","data":stud});

        }else{
            res.send({"status":200,"message":"Successfully Found","data":stud});

        }


    } catch (error) {
        
        res.send({"status":500,"message":error.message,"data":null});

    }

}

module.exports=getAllStud