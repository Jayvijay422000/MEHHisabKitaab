//take mobile number --> find _id from that 
//super user 
//admin
//staff
//https://code.pieces.app/blog/role-based-access-systems-in-nodejs#:~:text=Setting%20up%20User%20Authentication,signup%2C%20login%2C%20and%20authentication.

const userModel = require("../../models/user/userSchema");
const empmodel = require("../../models/employee/employeeSchema");

const bcrypt = require('bcrypt');
//only super user can register admin
//only super user can admin can register staff
//image upload


//add field in every table  created_at created_by , updated_at,updated_by 
const registerUser = async (req, res, role) => {

    try {
        const { email, mobile_number, password } = req.body;

        //check if user with same email or mobile exists

        const validateUserEmailAndMobile = async (userEmail, Mobile) => {
            return await userModel.findOne({ $or: [{ "email": userEmail }, { "mobile_number": Mobile }] }) ? false : true;
        }


        let emailMobileNotRegistered = await validateUserEmailAndMobile(email, mobile_number);
        if (!emailMobileNotRegistered) {
            return res.status(403).json({
                status: 403,
                message: 'Email or Mobile Number is already Registered',
                data: null
            })
        } else {

            var uid = await empmodel.findOne({ "email": email, "mobile_number": mobile_number, "active": true }).select("_id");
        }

        //get user id from employee table

        //hash password using bcrypt

        const hashpassword = await bcrypt.hash(password, 12);

        if (uid) {

            const user = new userModel({
                email: email,
                uid: uid,
                password: hashpassword,
                role: role,
                mobile_number: mobile_number,
                created_by: req.userId
            });
            const response = await user.save();
            res.status(200).send({ status: 200, message: "user added successfully", data: response });

        } else {
            res.status(404).send({ status: 404, message: "No such Employee", data: null });
        }


    } catch (error) {

        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });
    }

}

module.exports = registerUser