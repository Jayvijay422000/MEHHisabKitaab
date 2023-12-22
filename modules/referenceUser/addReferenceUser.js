const referenceUserModel = require("../../models/reference/referenceUserSchema")


const addReferenceUser = async (req, res) => {

    try {

        //add one default maruti reference user , if no outside reference pass the id of maruti user
        const { fullName, mobileNumber, email, address, dob } = req.body;


        const existsRefUser = await referenceUserModel.findOne({ email: email, mobile_number: mobileNumber });


        if (existsRefUser) {
            res.status(403).send({
                status: 403, message: "Reference User already exists", data: null
            });

        } else {

            const refUser = new referenceUserModel({
                full_name: fullName, mobile_number: mobileNumber, email: email,
                address: address, dob: dob, created_by: req.userId
            })
            await refUser.save()
            res.status(201).send({
                status: 201, message: "reference user added successfully", data: refUser
            });

        }

    } catch (error) {

        res.status(500).send({
            status: 500, message: "Internal Server Error", data: null
        });
    }
}

module.exports = addReferenceUser;