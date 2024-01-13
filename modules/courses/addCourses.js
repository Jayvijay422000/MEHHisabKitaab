const coursesModel = require("../../models/courses/courseSchema.js");

const addCourses = async (req, res) => {

    try {
        const { course_name, total_fees } = req.body;
        const course = new coursesModel({ course_name, total_fees, created_by: req.userId });

        const response = await course.save();

        res.status(201).send({ status: 201, message: "SuccessFully Added Course", data: response });

    } catch (error) {
        res.send({ status: 500, message: "Internal Server Error", data: null });
    }
}

module.exports = addCourses;