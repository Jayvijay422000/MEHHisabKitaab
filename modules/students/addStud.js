
const studmodel = require("../../models/students/studentsSchema");

const coursesModel = require("../../models/courses/courseSchema");

const addStud = async(req,res)=>{

        try{

            const {fullName,mobileNumber,email,address,qualification,dob,pincode,personalDoc,courseName,totalFees,DOA} =req.body;

            const existsStud = await studmodel.findOne({email:email});

            if(existsStud){

                res.status(403).send("student with email already exists")
            }else{
            const course_id = await coursesModel.findOne({course_name:courseName});
            if(course_id){

                const courseDetails={
                    course_id:course_id['_id'],
                    course_name:courseName,
                    total_fees:totalFees,
                    DOA:DOA
                }
                const stud = new studmodel({full_name:fullName,mobile_number:[mobileNumber],email:email,address:address,qualification:qualification,dob:dob,pincode:pincode,personal_doc:personalDoc,course_details:[courseDetails],created_by:req.userId})
                await stud.save()

                res.status(201).send(stud)
            }else{
                res.status(404).send("No valid course ")
            }
        }
        }catch(error){
            res.status(500).json({error:error.message})
        }

}

module.exports=addStud;