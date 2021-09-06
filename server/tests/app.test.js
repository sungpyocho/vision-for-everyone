const request = require('supertest');
const app = require('../app');
const db = require('./db');

beforeAll(async () => await db.connect());

afterEach(async () => await db.clear());

afterAll(async () => await db.disconnect());

// Test User registration to MongoDB Atlas
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
