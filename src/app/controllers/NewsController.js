class NewController {
    // [GET] /news
    index(req, res) {
        res.render('home');
    }

    // [GET] /:slug
    show(req, res) {
        res.send('New Detail');
    }
}

module.exports = new NewController();
