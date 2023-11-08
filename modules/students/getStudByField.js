const coursesModel = require("../../models/courses/courseSchema");
const studmodel = require("../../models/students/studentsSchema");

const getStudByField = async(req,res)=>{

        try {
            
            const { field , fieldValue } = req.query;
            var query={}
            if(field=="courseName"){
                const course_id=(await coursesModel.find({course_name:fieldValue},"_id")).sort({_id: -1})
                var query={
                    "course_details.course_id":course_id
                }
            }else{
                var query={
                    [field]:fieldValue
                }
            }
            const stud = await studmodel.find(query).sort({_id: -1}).limit(req.pagination.limit).skip(req.pagination.startIndex);

            if(!stud){
            
                res.status(404).send({status: 404, message: "No Data Found", data: null});

            }else{
                res.status(200).send({status: 200, message: "Successfully Found", data: stud});
            }
    

        } catch (error) {
            
            res.status(500).send({status: 500, message: error.message, data: null});
        }

}

module.exports=getStudByField