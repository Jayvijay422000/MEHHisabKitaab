require("dotenv").config();


const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const CourseSchema = new Schema({
   
    course_name :{
      type:String,
      required:true
    } ,
    total_fees: Number,
    
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel', // Reference to the User model (or whichever model represents your users)
      },
    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usermodel',
      }


},
{
collection:"courses",timestamps:true
}
);

const coursesModel =mongoose.model('coursesModel',CourseSchema);

module.exports=coursesModel