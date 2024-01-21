const Course = require("../models/Course");
const {mutipleMongooseToObject} = require('../../util/mongoose');

class SiteController {
  // [GET] /
  index(req, res, next) {
    Course.find({}) 
      .then(courses => {
          res.render('home', {
          courses: mutipleMongooseToObject(courses)
          });
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
