const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const SortMiddleware = require('./app/middlewares/sortMiddleware');

const route = require('./routers');
const db = require('./config/db');

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// Custom middleware
app.use(SortMiddleware);

//XMLHttpRequest, fetch, axios

// HTTP logger
// app.use(morgan('combined'))

//Template engine
app.engine('hbs', handlebars.engine({
    extname: '.hbs', helpers: {
        sum: (a, b) => a + b,
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';

            const icons = {
                default: 'fas fa-sort',
                asc: 'fas fa-sort-amount-down-alt',
                desc: 'fas fa-sort-amount-down',
            };

            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc',
            };

            const icon = icons[sortType];
            const type = types[sortType];

            return `<a href="?_sort&colunm=${field}&type=${type}">
            <i class="${icon}"></i>
          </a>`;
        }
    }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resource', 'views'));

// route init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
