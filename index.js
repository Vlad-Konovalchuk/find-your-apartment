require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');

const PORT = process.env.PORT || 4000
const app = express();

const db = require('./models')
const auth = require('./api/auth/routes')
const flatsRoutes = require('./api/flats/routes')

app.use(logger('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(helmet());

/*
app.use(cors({
  origin: 'http://localhost:4000',
  credentials: true
}));
*/
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', (req, res) => res.json({msg: 'Server is OK'}))

app.use('/auth', auth)
app.use('/flats', flatsRoutes)

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status|| 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  })
});


db.sequelize.sync({force: false}).then(async () => {
  console.log("DATABASE CONNECTED")
  app.listen(PORT, () =>
    console.log(`App listening on port ${PORT}!`)
  );
})
  .catch(e => console.log(e));
