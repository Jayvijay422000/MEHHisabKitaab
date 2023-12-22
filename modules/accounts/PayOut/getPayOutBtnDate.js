const { models } = require("mongoose");
const payOutModel = require("../../../models/accounts/payOutSchema");


const getPayOutBtnDate = async (req, res) => {

    try {
        const { startDate, endDate } = req.body;

        const result = await payOutModel.find({
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

module.exports = getPayOutBtnDate