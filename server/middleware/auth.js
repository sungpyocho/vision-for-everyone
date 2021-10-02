const { User } = require('../models/User');
const moment = require('moment');

let auth = (req, res, next) => {
  // 인증 처리를 하는 곳.
  // 클라이언트 쿠키에서 토큰을 가져온다.
  let token = req.cookies.x_auth;

  const isJWTExpired = tokenExp => {
    // 현재 시각 > tokenExp 시각 : JWT 유효기간 만료(true 반환)
    let now = moment().valueOf();
    return now > tokenExp;
  };
  console.log(token);
  // 쿠키에서 가져온 토큰이 이 유저의 토큰인가?
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true,
        message: '유저를 찾을 수 없습니다.',
      });
    if (isJWTExpired(user.tokenExp))
      return res.json({ isAuth: false, message: 'JWT token has expired.' });

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
