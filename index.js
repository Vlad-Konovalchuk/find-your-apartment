require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const PORT = process.env.APP_PORT
const app = express();

const db = require('./models')
const auth = require('./api/auth/routes')
const flatsRoutes = require('./api/flats/routes')

app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.get('/', (req, res) => res.json({msg: 'Server is OK'}))

app.use('/auth', auth)
app.use('/flats', flatsRoutes)

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || res.statusCode || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
});


db.sequelize.sync({force: false}).then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}!`),
  );
});
