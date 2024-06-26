const empmodel = require("../../models/employee/employeeSchema");


const updateEmp = async (req, res) => {

    try {
        const updateUser = await empmodel.findOneAndUpdate(
            { _id: req.body['_id'], active: true },
            { $set: req.body, updated_by: req.userId }, // Dynamically set all fields from req.body
            { new: true } //if true then it returns the updated data
        );
        if (!updateUser) {
            res.status(404).send({ status: 404, message: "No Such User Exist", data: updateUser });

        } else {
            res.status(200).send({ status: 200, message: "Successfully Updated", data: updateUser });

        }

    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }

}

module.exports = updateEmp;