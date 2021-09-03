const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const methodOverride = require('method-override');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const app = express();
const { formatDate, formatStory, editIcon, select } = require('./helpers/hbs');

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

require('./controllers/googleAuth')(passport);

//
// VIEW ENGINE
app.engine(
  '.hbs',
  exphbs({
    helpers: {
      formatDate,
      formatStory,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: 'views/partials/',
  })
);
app.set('view engine', '.hbs');

// EXPRESS SESSION
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// BODY PARSER
app.use(express.raw({ type: 'application/json' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10kb' }));

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;

  next();
});

// STATIC FILE
app.use(express.static(path.join(__dirname, 'Public')));

// ROUTES
const indexRouter = require('./routes/indexRoutes');
const authRouter = require('./routes/googleAuthRoutes');
const storyRouter = require('./routes/storyRoutes');
const { constants } = require('crypto');
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/stories', storyRouter);

module.exports = app;
