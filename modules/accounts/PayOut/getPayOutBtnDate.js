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
        });
        res.send({ "status": 200, "message": "successfully Found", "data": result });


    } catch (error) {
        res.send({ "status": 500, "message": error.message, "data": null });

    }
}

module.exports = getPayOutBtnDate