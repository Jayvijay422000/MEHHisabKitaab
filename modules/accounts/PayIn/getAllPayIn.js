const payInModel = require("../../../models/accounts/payInSchema");

const getAllPayIn = async (req, res) => {

    try {
       //  const page = req.query.page || 1;
        // console.log(page)
        // const pipeline = [
        //     {
        //       $skip: page * 10//req.pagination.startIndex
        //     },
        //     {
        //       $limit: 10//req.pagination.limit
        //     },
        //     {
        //         $sort: {
        //             _id: -1 // 1 for ascending, -1 for descending
        //         }
        //       }
           
        //   ];
        //const limit = 3
        const result = await payInModel.find()//.limit(limit).skip(limit * page).sort({ _id: -1 });
        const count = await payInModel.find({}).count();

        if (result > 0) {

            res.status(404).send({ status: 404, message: "No Data Found", data: null });

        } else {
            res.status(200).send({ status: 200, message: "successfully Found", data: result});
        }

    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }
}

module.exports = getAllPayIn