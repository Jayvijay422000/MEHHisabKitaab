const coursesModel = require("../../models/courses/courseSchema");
const studmodel = require("../../models/students/studentsSchema");


const dateWiseFees = async (req, res) => {

    try {
        const { courseName, startDate, endDate } = req.body;


        const cid = await coursesModel.find({ "course_name": courseName }, "_id")

        if (cid.length > 0) {

            /*const feesList = await studmodel.aggregate([
            {
                $match: {
                    "course_details.course_id": cid[0]["_id"],
                    "course_details.fees_installments.DOI":{
                        $gte: new Date(startDate),
                        $lte: new Date(endDate)
                    }
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
                        MobileNumber:"$mobile_number"
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
                    MobileNumber:"$_id.MobileNumber",
                    //CourseId: "$_id.CourseId",
                    totalInstallmentAmount: 1,
                    totalFees: 1
                }
            }
            ]);*/


            const feesList = await studmodel.find(
                {
                    "course_details.fees_installments.DOI": {

                        $lte: new Date(endDate),
                        $gte: new Date(startDate)
                    },
                    "course_details.course_id": cid[0]['_id']



                }).select("full_name course_details mobile_number");

            if (feesList.length < 1) {

                res.status(404).json({ error: "No data" })

            } else {
                res.status(200).send(feesList);
            }
        } else {
            res.status(404).json({ error: "No such Course" })
        }


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = dateWiseFees