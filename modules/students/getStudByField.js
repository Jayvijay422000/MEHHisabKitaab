const coursesModel = require("../../models/courses/courseSchema");
const studmodel = require("../../models/students/studentsSchema");

const getStudByField = async(req,res)=>{

        try {
            
            const { field , fieldValue } = req.query;
            var query={}
            if(field=="courseName"){
                const course_id=await coursesModel.find({course_name:fieldValue},"_id")
                var query={
                    "course_details.course_id":course_id
                }
            }else{
                var query={
                    [field]:fieldValue
                }
            }
            const stud = await studmodel.find(query);

            if(!stud){
                res.status(404).json({error:"No data"})
            }else{
                res.status(200).send(stud);
            }
    

        } catch (error) {
            
            res.status(500).json({error:error.message});
        }

}

module.exports=getStudByField