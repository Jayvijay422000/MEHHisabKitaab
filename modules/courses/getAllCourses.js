const coursesModel = require("../../models/courses/courseSchema");

const getAllCourses = async(req,res)=>{

try{

   const data= await coursesModel.find();

   if(!data){
    res.status(404).json({error:"No data"})
   }else{
    res.send(data);
   }
   
}catch(err){

    res.status(500).json({error:err.message});
}


}

module.exports=getAllCourses;