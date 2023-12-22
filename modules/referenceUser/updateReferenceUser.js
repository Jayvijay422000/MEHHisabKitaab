const referenceUserModel = require("../../models/reference/referenceUserSchema")

const updateReferenceUser = async (req, res) => {

    try {

        const updateRefUser = await referenceUserModel.findOneAndUpdate(

            { _id: req.body['refId'], active: true },
            { $set: req.body, updated_by: req.userId }, // Dynamically set all fields from req.body
            { new: true }
        );
        if (!updateRefUser) {
            res.status(404).send({ status: 404, message: "No Such Reference User Exist", data: null });
        } else {
            res.status(200).send({ status: 200, message: "Successfully Updated Reference User Details", data: updateRefUser });

        }


    } catch (error) {

        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }

}

module.exports = updateReferenceUser;