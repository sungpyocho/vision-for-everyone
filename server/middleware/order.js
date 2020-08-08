const { Restaurant } = require("../models/Restaurant");
const { Menu } = require("../models/Menu");
const config = require("../config/keys");
const kakaoAdminKey = config.kakaoAdminKey;

const axios = require("axios");

// 식당 이름과 메뉴 이름을 바탕으로, DB에서 메뉴가격만 찾아오는 함수.
async function findMenuPrice(restaurantName, menuName) {
  console.log("이름들", restaurantName, menuName);

  let menuPrice = 0;
  const data = await Menu.aggregate([
    {
      $match: {
        "menuId.name": restaurantName,
        "menuId.menuCategory.menuNamePrice.menuName": menuName,
      },
    },
    {
      $project: {
        "menuId.menuCategory.menuNamePrice.menuName": 1,
        "menuId.menuCategory.menuNamePrice.menuPrice": 1,
      },
    },
  ]);

  menuNamePrices = data[0].menuId[0].menuCategory;
  menuNamePrices.forEach((eachCategory) => {
    eachCategory.menuNamePrice.forEach((eachMenu) => {
      if (eachMenu.menuName === menuName) {
        menuPrice = eachMenu.menuPrice;
      }
    });
  });
  return menuPrice;
}
// Menu.findOne(
//   {
//     $and: [
//       {
//         menuId: { $elemMatch: { name: restaurant } },
//         "menuId.menuCategory.menuNamePrice": {
//           $elemMatch: { menuName: menuName },
//         },
//       },
//     ],
//   },
//   (err, result) => {
//     if (err || !result) {
//       return res.json({
//         message: "에러나쪄",
//       });
//     } else {
//       console.log(result);
//       res.json(result);
//     }
//   }
// );
// Menu.menuId.findOne(
//   {
//     $elemMatch: {
//       menuCategory: [
//         { $elemMatch: { menuNamePrice: [{ menuName: menuName }] } },
//       ],
//     },
//   },
//   (err, selectedMenu) => {
//     if (!selectedMenu) {
//       return res.json({
//         menuInDB: false,
//         message: "해당 메뉴를 찾을 수 없습니다.",
//       });
//     } else {
//       return res.send(selectedMenu.menuCategory.menuNamePrice.menuPrice);
//     }
//   }
// );

// 결제
// 변수로는 식당 이름, 결제 총 금액 2개.
async function payment(restaurantName, totalAmount) {
  console.log("들어와쪄요", restaurantName, totalAmount);
  const item_name = `${restaurantName}(키위 결제)`; // 식당 이름 변수
  const quantity = 1; // 카카오페이 목업결제에서 형식적으로 요구.
  const total_amount = totalAmount; // 변수
  const vat_amount = Math.floor(total_amount / 11); // 사용자 총 결제금액 기준 부가세
  const tax_free_amount = 0;

  const approval_url = "https://www.kiwe.team/chat"; // 성공시, 성공 페이지로 리다이렉트. 성공 페이지 만들어줘야함.
  const fail_url = "https://www.kiwe.team/chat"; // 실패시, 실패 페이지로 리다이렉트. 실패 페이지 필요.
  const cancel_url = "https://www.kiwe.team/chat"; // 취소시, 취소페이지로 리다이렉트. 취소페이지 구현필요.

  // set data
  const data = [
    "cid=TC0ONETIME",
    "partner_order_id=partner_order_id",
    "partner_user_id=partner_user_id",
    `item_name=${item_name}`,
    `quantity=${quantity}`,
    `total_amount=${total_amount}`,
    `vat_amount=${vat_amount}`,
    `tax_free_amount=${tax_free_amount}`,
    `approval_url=${approval_url}`,
    `fail_url=${fail_url}`,
    `cancel_url=${cancel_url}`,
  ].join("&"); // encode data (application/x-www-form-urlencoded)

  // send request (kakao payment)
  try {
    const req = await axios.post(
      "https://kapi.kakao.com/v1/payment/ready",
      data,
      {
        headers: {
          Authorization: `KakaoAK ${kakaoAdminKey}`, // 'xxx...' = admin key
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const mobile_url = req.data.next_redirect_mobile_url; // get mobile url

    const response = {
      statusCode: 301, // redirect
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
        Location: mobile_url,
      },
      body: "",
    };
    return response;
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { payment, findMenuPrice };
