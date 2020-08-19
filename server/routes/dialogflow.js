const express = require("express");
const router = express.Router();
const axios = require("axios");
const dialogflow = require("dialogflow");
var restaurantName = ""; // 전역변수

const { payment, findMenuPrice } = require("../middleware/order");
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
const sessionPath = sessionClient.sessionPath(projectId, "kiwe-session-1002");

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

  // 처음 대화 시작 시 식당 정보 저장해놓기
  if (result.action == "input.welcome") {
    const regExp = /\[([^\]]+)\]/;
    let matches = regExp.exec(result.fulfillmentText);
    restaurantName = matches[1];
  }

  // 프론트엔드로 정보 보내기
  // 만약 결제단계면, 카카오페이 결제창으로 redirect
  if (result.fulfillmentText.includes("카카오페이")) {
    result.outputContexts.forEach((context) => {
      // Dialogflow 답변에서 선택한 메뉴 정보를 담은 context를 찾음
      if (context.name.includes("finished_order_need_payment")) {
        let menuName = `${context.parameters.fields.coffee_menu.stringValue}(${context.parameters.fields.Size.stringValue})`; // '메뉴명(사이즈)'의 형식으로 DB에 저장된 메뉴 찾기
        let quantity = context.parameters.fields.number.numberValue;
         // db에서 가격 찾음
        findMenuPrice(restaurantName, menuName).then((price) => {
          let totalAmount = price * quantity; // 가격 x 수량 = 전체가격

          payment(restaurantName, totalAmount).then((result) => {
            // 영수증 띄워주기 위해 식당명, 메뉴명, DB 정보 활용한 총 금액을 클라이언트단에 보냄
            result.restaurantName = restaurantName;
            result.menuName = menuName;
            result.totalAmount = totalAmount;
            res.send(result);
          });
        });
      }
    });
  } else {
    res.send(result);
  }
});

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
