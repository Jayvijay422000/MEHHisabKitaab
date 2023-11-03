const payInModel = require("../../../models/accounts/payInSchema");

const getAllPayIn = async (req, res) => {

    try {
        const result = await payInModel.find().sort({_id: -1});

        if (!result) {

            res.status(404).send({ status: 404, message: "No Data Found", data: null });

        } else {
            res.status(200).send({ status: 200, message: "successfully Found", data: result });
        }

    } catch (error) {
        res.status(500).send({ status: 500, message: error.message, data: null });

    }
}

module.exports = getAllPayIn