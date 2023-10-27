const coursesModel = require("../../models/courses/courseSchema");

const mongoose= require("mongoose");
const getByIdCourses = async(req,res)=>{

try {


    const course = await coursesModel.findOne(new mongoose.Types.ObjectId(req.params["id"]));
    
    if(!course){
        res.status(404).send({ status: 404, message: "No Data Found", data: course });

    }else{

        res.status(200).send({ status: 200, message: "Successfully Found Student", data: course });

    }
    
    
} catch (error) {
    res.status(500).send({ status: 500, message: error.message, data: null });

}

}

module.exports=getByIdCourses