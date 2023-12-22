const empmodel = require("../../models/employee/employeeSchema");
const payOutModel = require("../../models/accounts/payOutSchema");
const EventEmitter = require('events');
const mongoose = require("mongoose");

const payOutEmitter = new EventEmitter();

// Subscribe to the 'greet' event
payOutEmitter.on('addSalary', async (description, amount) => {
  const type = "salary";
  const payout = new payOutModel({ type, description, amount });
  await payout.save();

});


const updateSalary = async (req, res) => {

  try {
    const { empId, salaryId, amount } = req.body
    const updateUser = await empmodel.findOneAndUpdate(
      {
        _id: new mongoose.Types.ObjectId(empId),
        'salary._id': new mongoose.Types.ObjectId(salaryId),
      },
      {
        $set: { 'salary.$.amount': amount },
      }
    )

    if (!updateUser) {
      res.status(404).send({ status: 404, message: "no such user exists", data: null });
    } else {
      // const description = "salary paid to "+updateUser["full_name"]+" \n Mobile Number  "+updateUser["mobile_number"];
      // payOutEmitter.emit('addSalary',description, updatedAmount);
      // console.log(description)
      res.status(201).send({ status: 201, message: "Successfully Updated", data: updateUser });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal Server Error", data: null })
  }

}

module.exports = updateSalary;