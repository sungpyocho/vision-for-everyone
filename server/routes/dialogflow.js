const express = require("express");
const router = express.Router();
const dialogflow = require("dialogflow");
const config = require("../config/keys");
// console.log(config); //키를 제대로 불러오는지 테스트하는 코드
const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
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
// re: 현재의 구글 인증은 GOOGLE_APPLICATION_CREDENTIALS 환경변수와 무관한, sessionClient 변수의 keyFilename으로 이루어지는 중
const sessionClient = new dialogflow.SessionsClient({
  keyFilename: './server/config/master-kiwebot-bdvjmr-a0970ec47dd9.json'
});
const sessionPath = sessionClient.sessionPath(projectId, sessionId);
console.log(projectId, sessionId);
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
  res.send(result);
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
