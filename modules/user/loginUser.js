const userModel = require('../../models/user/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

require("dotenv").config();

function comparePassword(plainPassword, hashPassword) {
    return bcrypt.compareSync(plainPassword, hashPassword)
}

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await userModel.findOne({ "email": email });
        if (!user || !comparePassword(password, user.password)) {
            return  res.status(401).send({ status: 401,message: "Authentication failed", data: null });
           
        } else {


            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
                expiresIn: 86400, //24 hrs
            });

            res.status(200).send({ status: 200,message: "Successfully login", data: {token, role:user.role} });

        }

    } catch (error) {
        res.status(500).send({ status: 500,message: error.message, data: null });

    }
}


module.exports = loginUser;