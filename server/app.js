require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

// Middleware
// 1. application/x-www-form-urlencoded 데이터 분석
// 2. application-json 데이터 분석
// 3. cookie 분석
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Router
const dialogflowRouter = require('./routes/dialogflow');
const userRouter = require('./routes/user');
const restaurantRouter = require('./routes/restaurant');

app.use('/api/dialogflow', dialogflowRouter);
app.use('/api/user', userRouter);
app.use('/api/restaurant', restaurantRouter);

module.exports = app;
