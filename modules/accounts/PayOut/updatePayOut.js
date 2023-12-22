const payOutModel = require("../../../models/accounts/payOutSchema")


const updatePayOut = async (req, res) => {


    try {

        const updatePayOut = await payOutModel.findOneAndUpdate(
            { _id: req.body['_id'] },
            { $set: req.body, updated_by: req.userId }, // Dynamically set all fields from req.body
            { new: true } //if true then it returns the updated data
        );
        if (!updatePayOut) {
            res.status(404).send({ status: 404, message: "No Such Data Exists", data: null });

        } else {
            res.status(200).send({ status: 200, message: "Successfully Updated", data: updatePayOut });

        }

    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });
    }
}

module.exports = updatePayOut