const coursesModel = require("../../models/courses/courseSchema");

const mongoose= require("mongoose");
const getByIdCourses = async(req,res)=>{

try {


    const course = await coursesModel.findOne(new mongoose.Types.ObjectId(req.params["id"]));
    
    if(!course){
        res.status(404).json(course)
    }else{
        res.json(course);
    }
    
    
} catch (error) {
    res.status(500).json({error:error.message})
}

}

module.exports=getByIdCourses