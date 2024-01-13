const empmodel = require("../../models/employee/employeeSchema");


const addEmp = async (req, res) => {

    try {

        const { full_name, mobile_number, address, qualification, mother_name, experience, email, documents, dob } = req.body;

        const existsStud = await empmodel.findOne({ email: email });

        if (existsStud) {
            res.status(403).send({ status: 403, message: "Employe with email already exists", data: null });

        } else {
            const emp = new empmodel({ full_name: full_name, mobile_number: mobile_number, address: address, email: email, qualification: qualification, mother_name: mother_name, experience: experience, documents: [documents], dob: dob, created_by: req.userId });

            const response = await emp.save();

            res.status(201).send({ status: 201, message: "Employee added successfully", data: response });

        }
    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }
}

module.exports = addEmp;