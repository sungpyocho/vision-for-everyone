// 테스트를 위해 app.listen을 server.js로 따로 분리
// listen을 app.js에 넣으면 port가 계속 열린 상태이므로 닫을 수 없다
// 서버가 돌아가는 상태이므로 jest테스트가 안끝나는 문제 발생
const app = require('./app');
const mongoose = require('mongoose');

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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Running on port: ${port}`);
});
