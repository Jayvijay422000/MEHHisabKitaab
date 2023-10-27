
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


const updateFees = async (req, res) => {

    try {
        const { studId, updatedFees, course_id, installmentId } = req.body;

    
        const updateStud = await studmodel.findOneAndUpdate(
        { $and: [{_id:  studId}, 
              {active: true}, 
              {"course_details.course_id": course_id}, 
              {"course_details.$.fees_installments.id": installmentId}]},
            {
                $set: {
                  "course_details.$[outer].fees_installments.$[inner].amount": updatedFees // Replace with the new amount
                }
              },
              {
                arrayFilters: [
                  { "outer.course_id":course_id },
                  { "inner._id": installmentId }
                ]
              }
        );

        // const updateStud=await studmodel.findOne( { 
        //         _id:  studId, 
        //         active: true, 
        //        "course_details.course_id":course_id, 
        //         "course_details.fees_installments.i_id":  installmentId})
        console.log(updateStud)
        //const updateStud = await studmodel.findOneAndUpdate(filter,update,options);

        if (!updateStud) {
            res.status(404).send({status: 404, message: "no such user exists", data: null});
        } else {
            const description = "Installment of " + updatedFees + " ₹ paid by " + updateStud["full_name"] + " \n Mobile Number  " + updateStud["mobile_number"][0];
            payInEmitter.emit('addFees', description, updatedFees);
            res.status(200).send({status: 200, message: "SuccessFully Updated", data: updateStud});
        }

    } catch (error) {
        res.status(500).json({status: 500, message: error.message, data: null })
    }

}

module.exports = updateFees;