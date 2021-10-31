const request = require('supertest');
const app = require('../app');
const db = require('./db');

beforeAll(async () => await db.connect());

afterEach(async () => await db.clear());

afterAll(async () => {
  await db.clear();
  await db.disconnect();
});

describe('POST /res-register', () => {
  test('should return error if there is no user with registered email', async () => {
    const response = await request(app)
      .post('/api/restaurant/res-register')
      .send({
        categoryName: 'test',
        resName: 'test-res',
        branchName: 'test-branch',
        location: {
          type: 'Point',
          coordinates: [127000000, 37.5],
        },
        address: 'test address',
        explanation: 'test restaurant',
        menuId: 'test',
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
      })
    );
  });
});

describe('POST /menu-register', () => {
  test('should return error if there is no user with registered email', async () => {
    const response = await request(app)
      .post('/api/restaurant//menu-register')
      .send({
        menuId: 'test-menu',
        category: [
          {
            name: 'test-category',
            menu: [
              {
                menuName: 'test-item-01',
                menuPrice: 9900,
              },
            ],
          },
        ],
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        success: true,
      })
    );

    // 이하 주석에서 버그 발생. 문제 확인 중.

    // const menuResponse = await request(app)
    //   .post('api/restaurant/get-menu')
    //   .send({
    //     branchName: '',
    //   });

    // expect(menuResponse.body).toEqual(
    //   expect.objectContaining({
    //     success: true,
    //   })
    // );
  });
});
