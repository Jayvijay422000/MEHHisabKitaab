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
            return  res.send({ "status": 401, "message": "Authentication failed", "data": null });
           
        } else {


            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
                expiresIn: 86400, //24 hrs
            });

            res.send({ "status": 200, "message": "Authentication failed", "data": {token} });

        }


    } catch (error) {
        res.send({ "status": 500, "message": error.message, "data": null });

    }
}


module.exports = loginUser;