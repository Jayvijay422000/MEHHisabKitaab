const studmodel = require("../../models/students/studentsSchema");



const getAllStud = async (req, res) => {

    try {


        const stud = await studmodel.aggregate([{
            $lookup: {
                from: 'referenceUser',
                localField: 'refId',
                foreignField: '_id',
                as: 'reference'
            }
        }
        ]).sort({ _id: -1 });

        if (!stud) {
            res.status(404).send({ status: 404, message: "No Data Found", data: [] });

        } else {
            res.status(200).send({ status: 200, message: "Successfully Found", data: stud });

        }


    } catch (error) {

        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }

}

module.exports = getAllStud