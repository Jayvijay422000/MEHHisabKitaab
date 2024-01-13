const payInModel = require("../../../models/accounts/payInSchema")


const updatePayIn = async (req, res) => {


    try {
        const updatePay = await payInModel.findOneAndUpdate(
            { _id: req.body['_id'] },
            { $set: req.body, updated_by: req.userId }, // Dynamically set all fields from req.body
            { new: true } //if true then it returns the updated data
        );
        
        if (!updatePay) {
            res.status(404).send({ status: 404, message: "No Such Data Exists", data: updatePay });

        } else {
            res.status(200).send({ status: 200, message: "Successfully Updated", data: updatePay });

        }

    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });
    }
}

module.exports = updatePayIn