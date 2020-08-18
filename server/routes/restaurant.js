const express = require("express");
const router = express.Router();
const { Menu } = require("../models/Menu");
const { Restaurant } = require("../models/Restaurant");

// 레스토랑 등록
router.post("/res-register", (req, res) => {
  // client 혹은 포스트맨에서 식당/메뉴등록 정보를 DB에 넣어줌.
  const restaurant = new Restaurant(req.body);

  restaurant.save((err, restaurantInfo) => {
    // 실패 또는 성공시, 유저에게 JSON형식으로 전달
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
      restaurantInfo: restaurantInfo,
    });
  });
});

// 메뉴 등록
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

router.post("/closest-restaurant", (req, res) => {
  const { long, lat } = req.body;

  // 가까운 열곳을 거리와 함께 출력하는 함수.
  const geoNear = async (limit) => {
    const results = await Restaurant.aggregate()
      .near({
        near: { type: "Point", coordinates: [long, lat] },
        distanceField: "distance", // meter
      })
      .limit(limit);
    return res.status(200).json(results);
  };

  geoNear(10);
});

module.exports = router;
