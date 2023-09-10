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
            return res.status(401).json({ message: 'Authentication failed ' + err });
        } else {


            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
                expiresIn: 86400, //24 hrs
            });

            res.json({ token });
        }


    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = loginUser;