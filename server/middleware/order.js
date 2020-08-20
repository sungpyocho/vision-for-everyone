const { Restaurant } = require("../models/Restaurant");
const { Menu } = require("../models/Menu");
const config = require("../config/keys");
const kakaoAdminKey = config.kakaoAdminKey;

const axios = require("axios");

// 식당 이름과 메뉴 이름을 바탕으로, DB에서 메뉴가격만 찾아오는 함수.
async function findMenuPrice(restaurantName, menuName) {
  let menuPrice = 0;
  const data = await Menu.aggregate([
    {
      $match: {
        menuId: restaurantName,
        "category.menu.menuName": menuName,
      },
    },
    {
      $project: {
        "category.menu.menuName": 1,
        "category.menu.menuPrice": 1,
      },
    },
  ]);

  categories = data[0].category;

  categories.forEach((eachCategory) => {
    eachCategory.menu.forEach((eachMenu) => {
      if (eachMenu.menuName === menuName) {
        menuPrice = eachMenu.menuPrice;
      }
    });
  });

  return menuPrice;
}

// 결제
// 변수로는 식당 이름, 결제 총 금액 2개.
async function payment(restaurantName, totalAmount) {
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
    console.log(err);
    console.error(err);
  }
}

module.exports = { payment, findMenuPrice };
