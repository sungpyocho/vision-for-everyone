require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`MongoDB Connected...`))
  .catch((err) => console.log(err));

// Middleware
// 1. application/x-www-form-urlencoded 데이터 분석
// 2. application-json 데이터 분석
// 3. cookie 분석
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Router
const dialogflowRouter = require("./routes/dialogflow");
const userRouter = require("./routes/user");
const restaurantRouter = require("./routes/restaurant");

app.use("/api/dialogflow", dialogflowRouter);
app.use("/api/user", userRouter);
app.use("/api/restaurant", restaurantRouter);

// Serve static assets if in production
// const CLIENT_BUILD_PATH = path.join(__dirname, "../client/build");
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static(CLIENT_BUILD_PATH));

//   // redirect all the non-api routes to react frontend
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(CLIENT_BUILD_PATH, "index.html"));
//   });
// }

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});
