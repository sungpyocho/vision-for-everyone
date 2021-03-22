const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { auth } = require("../middleware/auth");

// 비밀번호 재설정 메일 발송 관련
require("dotenv").config();
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const moment = require("moment");
// heroku 서버에서 시간을 KST로 설정해주도록
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

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
  const user = new User(req.body);

  user.save((err, userInfo) => {
    // 실패 또는 성공시, 유저에게 JSON형식으로 전달
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      userInfo: userInfo,
    });
  });
});

// 회원정보 수정 API
router.post("/edit", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      return res.status(400).send(err);
    }
    user.name = req.body.name;
    user.password = req.body.password;
    user.save((err, userInfo) => {
      // 실패 또는 성공시, 유저에게 JSON형식으로 전달
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
        userInfo: userInfo,
      });
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
    image: req.user.image,
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

// 비밀번호 재설정 메일 발송 API
router.post("/forgot", (req, res) => {
  if (req.body.email === "") {
    req.status(400).send({ message: "이메일을 입력해주세요." });
  }

  // 요청된 이메일을 DB에서 찾기
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      console.error("email not in database");
      return res.json({
        emailInDB: false,
        message: "해당 이메일로 가입한 이력이 없습니다.",
      });
    } else {
      // 만약 유저를 찾았다면 해시토큰 생성
      // Date.now() 대신 moment().valueOf()를 사용한 것은
      // 서버가 전 세계 어디 있든 같은 시간값을 사용하기 위해
      const resetToken = crypto.randomBytes(20).toString("hex");
      user.resetPwdToken = resetToken;
      user.resetPwdExp = moment().valueOf() + 600000; // 유효기간 10분
      user.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: `${process.env.EMAIL_ADDRESS}`,
          pass: `${process.env.EMAIL_PASSWORD}`,
        },
      });

      let tenMinsFromNow = moment().add(10, "minutes").format("LT");

      const message = {
        from: `${process.env.EMAIL_ADDRESS}`,
        to: `${user.email}`,
        bcc: "korra0501@gmail.com",
        subject: "[키위] 비밀번호 재설정 안내",
        text:
          "키위 계정에 대해서 새로운 비밀번호 설정 요청이 있었습니다.\n" +
          "혹시 요청하신 적이 있으시다면 아래 링크로 접속해 새로운 비밀번호를 설정해 주세요.\n" +
          `링크는 ${tenMinsFromNow}까지 유효합니다.\n\n` +
          `https://kiwe.app/reset/${user.resetPwdToken}\n\n` +
          "요청하신 적이 없다면 이메일을 무시해 주세요. 비밀번호는 변경되지 않은 채 안전하게 유지됩니다.\n\n" +
          "키위 개발팀 드림.",
      };

      console.log("이메일 송신중...");
      let sentValid = true;

      transporter.sendMail(message, (err, info) => {
        if (err) {
          console.log("이메일 송신 중 에러: ", err);
          sentValid = false;
          return err;
        } else {
          console.log("이메일 송신 완료!", info.response);
        }
      });
      // 왜 return을 sendMail의 콜백함수의 밖으로 빼야하는가?
      // 그것은 nodemailer가 이메일 발송에 비동기화 프로세스를 사용하기 때문이다.
      // 그래서 response를 sendMail function 뒤에 return해줘야 한다.
      // sendMail의 콜백함수 안에 return을 넣으면 response가 죽어도 안옴!
      if (sentValid) {
        return res.status(200).json({
          message: "비밀번호 복구 이메일 송신 완료",
        });
      } else {
        return res.status(500).json({
          message: "이메일 송신 실패",
        });
      }
    }
  });
});

// 비밀번호 재설정 API
router.post("/reset", (req, res, next) => {
  User.findOne({
    resetPwdToken: req.body.resetPwdToken,
    resetPwdExp: { $gt: moment().valueOf() },
  })
    .then((user) => {
      if (!user) {
        return res.json({
          message: "link not valid",
        });
      } else {
        // 유저가 있다면...
        // 만약 새로 입력한 비밀번호가 기존 비밀번호와 일치한다면 거부
        user.comparePassword(req.body.password, (err, isSame) => {
          if (isSame)
            return res.json({
              pwdNotChanged: true,
              message:
                "기존 비밀번호와 같습니다. 다른 비밀번호를 입력해주세요.",
            });
          // 이 관문을 넘었다면 새로운 비밀번호로 업데이트.
          user.password = req.body.password;
          user.resetPwdToken = null;
          user.resetPwdExp = null;

          user.save((err, userInfo) => {
            // 실패 또는 성공시, 유저에게 JSON형식으로 전달
            if (err) return res.json({ success: false, err });
            return res.status(200).json({
              success: true,
              userInfo: userInfo,
            });
          });
        });
      }
    })
    .catch((err) => {
      console.log("비밀번호 재설정 오류.\n", err);
    });
});

module.exports = router;
