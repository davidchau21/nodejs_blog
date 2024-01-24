const newsRouter = require('./news');
const siteRouter = require('./site');
const meRouter = require('./me');
const courseRouter = require('./courses');

function route(app) {
    app.use('/news', newsRouter);
    
    app.use('/me', meRouter);

    app.use('/courses', courseRouter);

    app.use('/', siteRouter);

    // app.post('/search', (req, res) => {
    //     console.log(req.body);
    //     res.send('');
    // });
}

module.exports = route;
