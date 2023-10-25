const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const feesSchema=new Schema(
    {
        student_id:{
            type:Schema.Types.ObjectId,
            ref:'studmodel',
            required:true
        },
        course_id:{
            type:Schema.Types.ObjectId,
            ref:'coursesModel',
            required:true
        }
    },
    {})