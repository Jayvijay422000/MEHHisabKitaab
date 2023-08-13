require("dotenv").config();


const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const CourseSchema = new Schema({
   
    course_name : String,
    total_fees: Number

},
{
collection:"courses"
}
);

const coursesModel =mongoose.model('coursesModel',CourseSchema);

module.exports=coursesModel