const coursesModel = require("../../models/courses/courseSchema");
const studmodel = require("../../models/students/studentsSchema");


const courseWiseFees = async (req, res) => {

    try {
        const { courseName } = req.body;

        const cid = await coursesModel.find({ "course_name": courseName }, "_id")

        if (cid.length > 0) {
            const feesList = await studmodel.aggregate([

                {
                    $match: {
                        "course_details.course_id": cid[0]["_id"]
                    }
                },
                {
                    $unwind: "$course_details"
                },
                {
                    $unwind: "$course_details.fees_installments"
                },
                {
                    $group: {
                        _id: {
                            FullName: "$full_name",
                            CourseId: "$course_details.course_id",
                            MobileNumber: "$mobile_number"
                        },
                        totalInstallmentAmount: {
                            $sum: "$course_details.fees_installments.amount"
                        },
                        totalFees: {
                            $first: "$course_details.total_fees"
                        }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        FullName: "$_id.FullName",
                        MobileNumber: "$_id.MobileNumber",
                        //CourseId: "$_id.CourseId",
                        totalInstallmentAmount: 1,
                        totalFees: 1
                    }
                }
            ]);

            if (!feesList) {


                res.status(404).send({ status: 404, message: "No Data Found", data: null });

            } else {

                res.status(200).send({ status: 200, message: "Successfully Found", data: feesList });

            }
        } else {
            res.status(404).send({ status: 404, message: "No Such Course", data: null });

        }


    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }
}

module.exports = courseWiseFees