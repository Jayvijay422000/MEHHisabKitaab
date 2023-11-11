const studmodel = require("../../models/students/studentsSchema");



const getAllStud = async(req,res)=>{

    try {
        
       
        //const stud = await studmodel.find().sort({_id: -1});
        const stud = await studmodel.aggregate([{"$lookup":{
            "from":"referenceUser",
            "localField":"refId",
            "foreignField":"_id",
            "as":"reference User"
            
        }},{
            $project: {
              "_id": 1,
              "active": 1,
              "full_name": 1,
              "mobile_number": 1,
              "email": 1,
              "address": 1,
              "qualification": 1,
              "dob": 1,
              "pincode": 1,
              "personal_doc": 1,
              "course_details": 1,
              "updatedAt": 1,
              "refId": 1,
              "reference User.full_name": 1
            }
          }])

        if(!stud){
            res.status(404).send({status: 404, message: "No Data Found", data: []});

        }else{
            res.status(200).send({status: 200, message: "Successfully Found", data: stud});

        }


    } catch (error) {
        
        res.status(500).send({status: 500, message: error.message, data: null});

    }

}

module.exports=getAllStud