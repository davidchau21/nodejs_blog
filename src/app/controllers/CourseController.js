const Course = require("../models/Course");
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');

class CourseController {
  // [GET] /courses/:slug
  show(req, res, next) {
    Course.findOne({slug: req.params.slug})
      .then((course) => {
        res.render('courses/show', {course: mongooseToObject(course)});
      }
      ).catch((error) => next(error));
  }
}

module.exports = new CourseController();
