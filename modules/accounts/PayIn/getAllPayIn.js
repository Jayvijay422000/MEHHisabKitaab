const payInModel = require("../../../models/accounts/payInSchema");

const getAllPayIn = async (req, res) => {

    try {
        const result = await payInModel.find();

        if (!result) {

            res.send({ "status": 404, "message": "No Data Found", "data": null });

        } else {
            res.send({ "status": 200, "message": "successfully Found", "data": result });
        }

    } catch (error) {
        res.send({ "status": 500, "message": error.message, "data": null });

    }
}

module.exports = getAllPayIn