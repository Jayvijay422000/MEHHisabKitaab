
const studmodel = require("../../models/students/studentsSchema");

const coursesModel = require("../../models/courses/courseSchema");



const addStud = async (req, res) => {

    try {

        const { fullName, MobileNumber, email, address, qualification, dob, pincode, courseName, totalFees, DOA } = req.body;

        const existsStud = await studmodel.findOne({ email: email });

        if (existsStud) {
            res.send({ "status": 200, "message": "student with email already exists", "data": null });

        } else {


            const uploadedFile = req.files;
            console.log(req.files);
            const course_id = await coursesModel.findOne({ course_name: courseName });
            console.log(course_id)
            if (course_id) {

                const courseDetails = {
                    course_id: course_id['_id'],
                    total_fees: totalFees,
                    DOA: DOA
                }
                console.log(uploadedFile)

                const personalDoc = {
                    aadhar_card: uploadedFile[0].filename,
                    marksheet: uploadedFile[1].filename
                }
                const stud = new studmodel({ full_name: fullName, mobile_number: [MobileNumber], email: email, address: address, qualification: qualification, dob: dob, pincode: pincode, personal_doc: personalDoc, course_details: [courseDetails], created_by: req.userId })
                const response = await stud.save()
                res.send({ "status": 200, "message": "student added successfully", "data": response });


            } else {
                res.send({ "status": 404, "message": "No Course Found", "data": null });

            }
        }
    } catch (error) {
        res.send({"status":500,"message":error.message,"data":null});

    }

}


// const uploadStudImg= async(req,res)=>{
//     try {

//          uploadedFile=req.files;
//         console.log(uploadedFile)
//         res.send({uploadedFile})
//     } catch (error) {
//         res.status(500).json({error:error.message})
//     }
// }

module.exports = addStud;