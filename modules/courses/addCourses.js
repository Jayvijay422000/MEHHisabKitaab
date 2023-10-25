const coursesModel = require("../../models/courses/courseSchema.js");

const addCourses = async(req,res)=>{  

    try{
        const {course_name,total_fees}=req.body;
        const course = new coursesModel({course_name,total_fees,created_by:req.userId});

        const response =await course.save();

        res.send({"status":200,"message":"Course Added",data:response});

    }catch(error){
        res.send({ "status": 500, "message": error.message, "data": null });
    }
}

module.exports =addCourses;