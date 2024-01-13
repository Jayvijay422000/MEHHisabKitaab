const empmodel = require("../../models/employee/employeeSchema");


const getEmpByField = async (req, res) => {

    try {

        const { field, fieldValue } = req.query;

        const query = {
            [field]: fieldValue
        }
        const emp = await empmodel.findOne(query);

        if (!emp) {
            res.status(404).send({ status: 404, message: "No Data Found", data: null });
        } else {
            res.status(200).send({ status: 200, message: "Successfully Found", data: emp });
        }


    } catch (error) {

        res.send({ status: 500, message: "Internal Server Error", data: null });
    }

}

module.exports = getEmpByField