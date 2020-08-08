const express = require("express");
const router = express.Router();
const { Menu } = require("../models/Menu");
const { Restaurant } = require("../models/Restaurant");

router.post("/res-register", (req, res) => {
    // client 혹은 포스트맨에서 식당/메뉴등록 정보를 DB에 넣어줌.
    console.log('REQ_BODY', req.body)
    const restaurant = new Restaurant(req.body);
    console.log('RESTAURANT', restaurant);

    restaurant.save((err, restaurantInfo) => {
      // 실패 또는 성공시, 유저에게 JSON형식으로 전달
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
        restaurantInfo: restaurantInfo,
      });
    });
  });

router.post("/menu-register", (req, res) => {
    // client 혹은 포스트맨에서 식당/메뉴등록 정보를 DB에 넣어줌.
    const menu = new Menu(req.body); // bodyParser가 있어서 req.body가 가능.
    
    menu.save((err, menuInfo) => {
      // 실패 또는 성공시, 유저에게 JSON형식으로 전달
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
        menuInfo: menuInfo,
      });
    });
  });

module.exports = router;