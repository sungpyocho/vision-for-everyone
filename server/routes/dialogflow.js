const express = require("express");
const router = express.Router();
const axios = require("axios");
const dialogflow = require("dialogflow");

const config = require("../config/keys");
const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
const kakaoAdminKey = config.kakaoAdminKey;
// 아래 방법을 써보려고 했으나 전혀 말을 듣지 않았다...
// const credentials = {
//   client_email: config.googleClientEmail,
//   private_key: config.googlePrivateKey.replace(/\\n/g, "\n"),
// };

// const sessionClient = new dialogflow.SessionsClient({
//   projectId: projectId,
//   credentials: credentials,
// });

// 결국, 구글 인증 관련은 GOOGLE_APPLICATION_CREDENTIALS 환경변수를 설정하여 해결하자.
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, "kiwe-session-1010");

// Text Query Route
router.post("/textQuery", async (req, res) => {
  // 클라이언트에서 온 정보를 Dialogflow API로 보내기
  // text query request
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        // bodyParser 라이브러리를 설치했기 때문에, req.body로 받아올 수 있음
        text: req.body.text,
        // The language used by the client
        languageCode: languageCode,
      },
    },
  };

  // Dialogflow에서 받은 정보들을 처리하는 파트
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  // 프론트엔드로 정보 보내기
  // 만약 결제단계면, 카카오페이 결제창으로 redirect
  if (result.fulfillmentText.includes("카카오페이")) {
    payment().then((result) => {
      res.send(result);
    });
  } else {
    res.send(result);
  }
});

// 결제
async function payment() {
  // set variables
  const item_name = "에스프레소(테스트)";
  const quantity = 1;
  const total_amount = 5000;
  const vat_amount = 500;
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
}

// Event Query Route
router.post("/eventQuery", async (req, res) => {
  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      event: {
        // The query to send to the dialogflow agent
        // bodyParser 라이브러리를 설치했기 때문에, req.body로 받아올 수 있음
        name: req.body.event,
        // The language used by the client
        languageCode: languageCode,
      },
    },
  };

  // Dialogflow에서 받은 정보들을 처리하는 파트
  const responses = await sessionClient.detectIntent(request);
  console.log("Detected intent");
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);

  // 프론트엔드로 정보 보내기
  res.send(result);
});

module.exports = router;
