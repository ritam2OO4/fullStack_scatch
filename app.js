const express = require('express')
const app = express();
const db = require('./config/mongoose-connection')
const usersRouter = require('./routes/userRouter')
const ownerRouter = require('./routes/ownerRouter')
const productsRouter = require('./routes/productsRouter')
const indexRouter = require('./routes/indexRouter')
const path = require('path')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_KEY,
}))
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')

app.use('/', indexRouter);
app.use('/owners', ownerRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.listen(3000)