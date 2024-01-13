const { models } = require("mongoose");
const payInModel = require("../../../models/accounts/payInSchema");


const getPayInBtnDate = async (req, res) => {

    try {
        const { startDate, endDate } = req.body;

        const result = await payInModel.find({
            date: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        }).sort({ _id: -1 });

        res.status(200).send({ status: 200, message: "successfully Found", data: result });

    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }
}

module.exports = getPayInBtnDate