const coursesModel = require("../../models/courses/courseSchema");

const getAllCourses = async (req, res) => {

    try {

        const data = await coursesModel.find();

        if (!data) {
            res.status(404).send({ status: 404, message: "No Such Course", data: null });
        } else {
            res.status(200).send({ status: 200, message: "Successfully Found Courses", data: data });

        }

    } catch (error) {
        res.status(500).send({ status: 500, message: "Internal Server Error", data: null });

    }


}

module.exports = getAllCourses;