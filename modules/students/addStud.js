
const studmodel = require("../../models/students/studentsSchema");

const coursesModel = require("../../models/courses/courseSchema");
const referenceUserModel = require("../../models/reference/referenceUserSchema");



const addStud = async (req, res) => {
    try {
        const { fullName, mobileNumber, email, address,
            qualification, dob, pincode, personalDoc,
            courseName, totalFees, DOA,refId
        } = req.body;

        const existsRefUser = referenceUserModel.findOne({_id:refId})

        

        const existsStud = await studmodel.findOne({ email: email });

        if (existsStud) {
            res.status(403).send({
                status: 403, message: "student already exists", data: null
            });

        } else if(!existsRefUser){
            res.status(403).send({
                status: 403, message: "Invalid Reference User", data: null
            });
        }
         else {
            const course_id = await coursesModel.findOne({ course_name: courseName });
            if (course_id) {

                const courseDetails = {
                    course_id: course_id['_id'],
                    course_name: courseName,
                    total_fees: totalFees,
                    DOA: DOA
                }

                //add one default maruti reference user , if no outside reference pass the id of maruti user

                const stud = new studmodel({
                    full_name: fullName, mobile_number: [mobileNumber], email: email,
                    address: address, qualification: qualification, dob: dob,
                    pincode: pincode, personal_doc: personalDoc, course_details: [courseDetails],refId:refId,
                    created_by: req.userId
                })
                await stud.save()
                res.status(201).send({
                    status: 201, message: "student added successfully", data: stud
                });


            } else {
                res.status(404).send({
                    status: 404, message: "No Course Found", data: null
                });

            }
        }
    } catch (error) {
        res.status(500).send({
            status: 500, message: error.message, data: null
        });

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