const empmodel = require("../../models/employee/employeeSchema");


const addEmp= async(req,res)=>{

    try{
        /*
        document :{
            "addhar card":"path of file"
        }
        */

        const {full_name, mobile_number , address,qualification,mother_name,experience,email,documents }=req.body;

        const emp = new empmodel({full_name:full_name, mobile_number:mobile_number , address:address,email:email,qualification:qualification,mother_name:mother_name,experience:experience ,documents:[documents]});

        await emp.save();

        res.send("Employee Added");


    }catch(error){
        res.status(500).json({error:error.message})
    }
}

module.exports = addEmp;