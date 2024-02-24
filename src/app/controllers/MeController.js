const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../util/mongoose");

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {

    let courseQuery = Course.find({});

    if(req.query.hasOwnProperty('_sort')){
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type
      })
    }

    Promise.all([courseQuery, Course.countDocumentsDeleted()])
      .then(([courses, deleteCount]) =>
        res.render("me/stored-courses", {
          deleteCount,
          courses: mutipleMongooseToObject(courses),
        })
      )
      .catch(next);

    Course.countDocumentsDeleted()
      .then((deleteCount) => {
        // console.log(deleteCount);
      })
      .catch(() => { });

    // Course.find({})
    // .then(courses => res.render("me/stored-courses", {
    //   courses: mutipleMongooseToObject(courses)
    // }))
    // .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req , res, next) {
    Course.findDeleted({deleted: true})
    .then(courses => res.render("me/trash-courses", {
      courses: mutipleMongooseToObject(courses)
    }))
    .catch(next);
  }

  // trashCourses(req, res, next) {
  //   Course.findDeleted({ deleted: true })
  //     .then(deletedCourses => {
  //       console.log(deletedCourses); // Log deleted courses for debugging
  //       res.render("me/trash-courses", {
  //         courses: mutipleMongooseToObject(deletedCourses)
  //       });
  //     })
  //     .catch(error => {
  //       console.error(error); // Log any errors that occur
  //       next(error); // Pass the error to the error-handling middleware
  //     });
  // }


}

module.exports = new MeController();
