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

  // [GET] /courses/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [POST] /courses/store
  store(req, res, next) {
    const formData = req.body;
    req.body.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;
    const course = new Course(formData);
    course.save()
      .then(() => res.redirect('/'))
      .catch((error) => next(error));

  }
}

module.exports = new CourseController();
