const payInModel = require("../../../models/accounts/payInSchema");

const getAllPayIn = async (req, res) => {

    try {

        const pipeline = [
            {
              $skip: req.pagination.startIndex
            },
            {
              $limit:req.pagination.limit
            },
            {
                $sort: {
                    _id: -1 // 1 for ascending, -1 for descending
                }
              }
           
          ];
    
        const result = await payInModel.aggregate(pipeline);;

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