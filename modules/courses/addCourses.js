const coursesModel = require("../../models/courses/courseSchema.js");

const addCourses = async(req,res)=>{  

    try{
        const {course_name,total_fees}=req.body;
        const course = new coursesModel({course_name,total_fees,created_by:req.userId});

        await course.save();

        res.send("Added");
    }catch(err){
        res.status(500).json({error:error.message})
    }
}

module.exports =addCourses;