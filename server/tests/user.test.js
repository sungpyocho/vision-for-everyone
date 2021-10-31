const request = require('supertest');
const app = require('../app');
const db = require('./db');

beforeAll(async () => await db.connect());

afterEach(async () => await db.clear());

afterAll(async () => await db.disconnect());

describe('POST /login', () => {
  test('should return error if there is no user with registered email', async () => {
    await request(app).post('/api/user/register').send({
      name: 'Jest',
      email: 'testmail@outlook.com',
      password: 'password',
    });
    const response = await request(app).post('/api/user/login').send({
      email: 'korra0501@gmail.com',
      password: 'password',
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        message: '해당 이메일을 가진 유저가 없습니다.',
      })
    );
  });

  test('should return error if the user inputs wrong pw', async () => {
    await request(app).post('/api/user/register').send({
      name: 'Jest',
      email: 'testmail@outlook.com',
      password: 'password',
    });
    const response = await request(app).post('/api/user/login').send({
      email: 'testmail@outlook.com',
      password: 'wrong_password',
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        message: '올바른 비밀번호를 입력하세요.',
      })
    );
  });

  test('should return true when id&pw are correct', async () => {
    await request(app).post('/api/user/register').send({
      name: 'Jest',
      email: 'testmail@outlook.com',
      password: 'password',
    });
    const response = await request(app).post('/api/user/login').send({
      email: 'testmail@outlook.com',
      password: 'password',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        loginSuccess: true,
      })
    );
  });
});

// Test User registration to In-Memory DB
describe('POST /register', () => {
  test('should respond with 200 status code', async () => {
    const response = await request(app).post('/api/user/register').send({
      name: 'Jest',
      email: 'testmail@outlook.com',
      password: 'password',
    });
    expect(response.statusCode).toBe(200);
  });

  test('should specifiy json in content type header', async () => {
    const response = await request(app).post('/api/user/register').send({
      name: 'Jest',
      email: 'testmail@outlook.com',
      password: 'password',
    });
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('json')
    );
  });

  test('should respond with json object containing success:true', async () => {
    const response = await request(app).post('/api/user/register').send({
      name: 'Jest',
      email: 'testmail@outlook.com',
      password: 'password',
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
      })
    );
  });
});

describe('POST /edit', () => {
  test('should return status code 200 when edit is correctly done', async () => {
    // 계정 등록
    await request(app).post('/api/user/register').send({
      name: 'Jest',
      email: 'testmail@outlook.com',
      password: 'password',
    });
    // 로그인
    const loginRes = await request(app).post('/api/user/login').send({
      email: 'testmail@outlook.com',
      password: 'password',
    });

    let cookie = loginRes.res.rawHeaders[5];
    const response = await request(app)
      .post('/api/user/edit')
      .set('Cookie', [cookie])
      .send({
        name: 'Mocha',
        password: 'new_password',
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.userInfo.name).toEqual('Mocha');
  });
});

describe('GET /logout', () => {
  test('should return status code 200 when successfully logged out', async () => {
    // 계정 등록
    await request(app).post('/api/user/register').send({
      name: 'Jest',
      email: 'testmail@outlook.com',
      password: 'password',
    });

    // 로그인
    const loginRes = await request(app).post('/api/user/login').send({
      email: 'testmail@outlook.com',
      password: 'password',
    });

    let cookie = loginRes.res.rawHeaders[5];
    const response = await request(app)
      .get('/api/user/logout')
      .set('Cookie', [cookie])
      .send();
    expect(response.statusCode).toBe(200);
  });
});
