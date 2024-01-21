const Course = require("../models/Course");

class SiteController {
  // [GET] /
  index(req, res, next) {
    Course.find({}) 
      .then(courses => {
          courses = courses.map(course => course.toObject())
          res.render('home', {courses});
      })
      .catch(next);
  }

  // async index(req, res) {
  //   try {
  //       const source = await Course.find({});
  //       res.json(source);
  //   } catch (error) {
  //       res.status(400).json({ error });
  //   }
  // }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();
