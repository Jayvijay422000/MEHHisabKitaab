const studmodel = require('../../models/students/studentsSchema');

const updateStud = async (req, res) => {

    try {

        const updateUser = await studmodel.findOneAndUpdate(

            { _id: req.body['studId'], active: true },
            { $set: req.body, updated_by: req.userId }, // Dynamically set all fields from req.body
            { new: true }
        );
        if (!updateUser) {
            res.status(404).send({ status: 404, message: "No Such User Exist", data: updateUser });
        } else {
            res.status(200).send({ status: 200, message: "Successfully Updated Student Details", data: updateUser });

        }


    } catch (error) {

        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }

}

module.exports = updateStud; 