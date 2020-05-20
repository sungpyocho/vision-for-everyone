# 키위

![키위 PPT](./kiwe_ppt_first_slide.jpg)

## 홈페이지

URL: https://www.kiwe.team/

## 특징

- 시각장애인 분들을 위한 키오스크 대체 결제 시스템
- 챗봇으로 간편하게 주문 가능(결제는 추후 추가 예정)

## For Developers

Before you run the app - basic settings
In the server directory, you can find a folder named `config`.
Make a file named `dev.js`.
And type your settings as below:

```
module.exports = {
  googleProjectID: "--YOUR-PROJECT-ID--",
  dialogFlowSessionID: "your-own-session",
  dialogFlowSessionLanguageCode: "en-US",
  googleClientEmail:"sample.iam.gserviceaccount.com",
  googlePrivateKey:
  mongoURI: "mongodb+srv://----YOUR-MONGODB-ATLAS-KEY----",
  emailAddress: "----YOUR-GMAIL-ADDRESS----",
  emailPassword: "----YOUR-MAIL-PASSWORD----",
};
```

email address will be used as a mail which sends password reset messages.

## When you run the app

In the project directory, you can run:

`npm run dev`
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
