const coursesModel = require("../../models/courses/courseSchema");

const getAllCourses = async(req,res)=>{

try{

   const data= await coursesModel.find();

   if(!data){
    res.send({ "status": 404, "message": "No Such Course", "data": null });
   }else{
    res.send({ "status": 200, "message": "Successfully Found", "data": data });

   }
   
}catch(error){
    res.send({ "status": 500, "message": error.message, "data": null });

}


}

module.exports=getAllCourses;