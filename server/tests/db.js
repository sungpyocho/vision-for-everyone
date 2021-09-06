const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

// MongoDB Atlas에 직접 연결하지 않고, in-memory database를 사용하는 이유
// 실제 사용하는 DB에 테스트 데이터를 추가하면, 추가한 데이터를 찾아 지우기 번거롭다
// 테스트 케이스가 진행될 때 마다 추가한 데이터만 콕 찝어 지우긴 힘들다.
// 또한 실수로 사용자 데이터를 건드려 삭제할 수도 있는 위험성도 내재하고 있다.
// 따라서, 실제 MongoDB와 똑같이 동작하는 In-Memory DB를 쓴다.
// 추가한 데이터를 찾아 지우는 대신, 시원하게 DB를 초기화하므로 테스트하기 편하다.

let mongod = undefined;

// Connect to in-memory-database
module.exports.connect = async () => {
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  };
  await mongoose.connect(uri, opts);
};

// Disconnect and close connection
module.exports.disconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
};

// Clear DB by removing all data
module.exports.clear = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
};
