const express = require('express');
const router = express.Router();
const dialogflow = require('dialogflow');

const config = require('../config/keys');
const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

// 새로운 생성 세션
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// Text Query Route
router.post('/textQuery', async(req, res) => {
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
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(result);
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    // 프론트엔드로 정보 보내기
    res.send(result);
})


// Event Query Route
router.post('/eventQuery', async (req, res) => {
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
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);

    // 프론트엔드로 정보 보내기
    res.send(result);
})

module.exports = router;