const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post("/login", (req, res) => {
  // 요청된 이메일을 DB에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당 이메일을 가진 유저가 없습니다.",
      });
    }
    // 유저를 찾았다면 비밀번호가 동일한지 확인
    user.comparePassword(req.body.password, (err, isSame) => {
      if (!isSame)
        return res.json({
          loginSuccess: false,
          message: "올바른 비밀번호를 입력하세요.",
        });

      // 비밀번호까지 같다면, 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰을 저장할 땐 쿠키, 로컬스토리지, 세션 등 다양한 방법이 있으나
        // 여기에서는 쿠키 사용
        res.cookie("x_authExp", user.tokenExp);
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

router.post("/register", (req, res) => {
  // client에서 회원가입시 필요한 정보를 받으면 DB에 넣어줌.
  const user = new User(req.body); // bodyParser가 있어서 req.body가 가능.

  user.save((err, userInfo) => {
    // 실패 또는 성공시, 유저에게 JSON형식으로 전달
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      userInfo: userInfo,
    });
  });
});

// auth는 미들웨어. 리퀘스트를 받은 후, 콜백함수를 넘겨주기 전에 하는 것.
router.get("/auth", auth, (req, res) => {
  // 여기까지 미들웨어를 통과했다는 것 = 인증 성공
  // 해당하는 유저의 정보를 선별해서 프론트엔드로 보내준다.
  res.status(200).json({
    _id: req.user.id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
});

// 로그아웃. auth 미들웨어를 넣어준 것은 로그아웃 전 로그인 상태이기 때문
router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate(
    { _id: req.user._id },
    { token: "", tokenExp: "" },
    (err, user) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send({
        success: true,
      });
    }
  );
});

module.exports = router;
