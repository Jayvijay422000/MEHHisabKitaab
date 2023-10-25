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
            
                res.send({"status":404,"message":"No Data Found","data":stud});

            }else{
                res.send({"status":200,"message":"Successfully Found","data":stud});
            }
    

        } catch (error) {
            
            res.send({"status":500,"message":error.message,"data":null});
        }

}

module.exports=getStudByField