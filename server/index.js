require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// Connect to MongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PASSWORD}@kiwebot-small-qkbxn.gcp.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log(`MongoDB Connected...`))
  .catch(err => console.log(err));

// Middleware
// 1. application/x-www-form-urlencoded 데이터 분석
// 2. application-json 데이터 분석
// 3. cookie 분석
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Router
const dialogflowRouter = require('./routes/dialogflow');
const userRouter = require('./routes/user');
const restaurantRouter = require('./routes/restaurant');

app.use('/api/dialogflow', dialogflowRouter);
app.use('/api/user', userRouter);
app.use('/api/restaurant', restaurantRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});
