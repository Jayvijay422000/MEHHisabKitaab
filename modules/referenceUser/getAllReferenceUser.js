const referenceUserModel = require("../../models/reference/referenceUserSchema")



const getReferenceUser = async (req, res) => {

    try {


        const refUser = await referenceUserModel.find().sort({ _id: -1 });

        if (!refUser) {
            res.status(404).send({ status: 404, message: "No Data Found", data: [] });

        } else {
            res.status(200).send({ status: 200, message: "Successfully Found", data: refUser });

        }


    } catch (error) {

        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }

}

module.exports = getReferenceUser