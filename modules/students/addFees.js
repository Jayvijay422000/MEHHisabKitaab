
const EventEmitter = require('events');
const studmodel = require('../../models/students/studentsSchema');
const PayInModel = require('../../models/accounts/payInSchema');
const mongoose = require("mongoose");

const payInEmitter = new EventEmitter();

// Subscribe to the 'greet' event
payInEmitter.on('addFees', async (description, amount) => {
    const type = "Fees";
    const payout = new PayInModel({ type, description, amount });
    const result = await payout.save();

});


const addFees = async (req, res) => {

    try {
        const { studId, newFees, course_id } = req.body;

        const updateStud = await studmodel.findOneAndUpdate(
            { _id: studId, active: true, "course_details.course_id": new mongoose.Types.ObjectId(course_id) },
            { $push: { "course_details.$.fees_installments": newFees } }, // Dynamically set all fields from req.body
            { new: true }
        );

        if (!updateStud) {
            res.status(404).send({ status: 404, message: "No Such User Exist", data: null });
        } else {
            const description = "Installment paid by " + updateStud["full_name"] + " \n Mobile Number  " + updateStud["mobile_number"][0];
            payInEmitter.emit('addFees', description, newFees['amount'])
            res.status(200).send({ status: 200, message: "Fees Added Successfully", data: updateStud });
        }

    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }

}

module.exports = addFees;