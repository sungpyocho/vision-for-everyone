# 키위

## 홈페이지

URL: https://kiwe.app/

## 특징

- 시각장애인 분들을 위한 키오스크 대체 결제 시스템
- 챗봇으로 간편하게 주문 가능(테스트 결제까지만 지원)

## For Developers

### What's this?

`TL;DR` Dockerized MERN app + Nginx + Let's Encrypt + Dialogflow

- Backend: MongoDB Atlas, Express.js, Node.js
- Frontend: React
- Web server: Nginx and Let's Encrypt(SSL). Supports HTTPS!
- and it is... Dockerized!

### Before you run the app - basic settings

1. In the server directory, make a file named `.env`.
   And type your settings as below.

   email address will be used as a mail which sends password reset messages.

```
GOOGLE_PROJECT_ID = "----YOUR-PROJECT-ID----",
DIALOGFLOW_SESSION_ID = "your-own-session",
DIALOGFLOW_LANGUAGE_CODE = "ko-KR",
GOOGLE_CLIENT_EMAIL = "sample.iam.gserviceaccount.com",
GOOGLE_PRIVATE_KEY = "----YOUR-GOOGLE-PRIVATE-KEY----"
MONGO_URI = "mongodb+srv://----YOUR-MONGODB-ATLAS-KEY----",
EMAIL_ADDRESS = "----YOUR-GMAIL-ADDRESS----",
EMAIL_PASSWORD = "----YOUR-MAIL-PASSWORD----",
KAKAO_ADMIN_KEY = "----YOUR-KAKAO-DEVELPER-ADMIN-KEY----"
```

2. In the client directory, make a file named `.env`.
   And type your settings as below:

```
REACT_APP_KAKAO_MAP_KEY=YOUR-KAKAO-MAP-KEY
```

## When you run the app(Dev)

In the project root directory, you should run:

`docker-compose -f dev-docker-compose.yml up --build --remove-orphans`

Runs the app in the development mode.

Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## When you run the app(Prod)

- The React static files will be served by ngnix.
- Nginx will be a reverse proxy to the Express server(running in port 3000).
- To get and renew certificate, we will use `certbot`.

1. Get any VPS(such as AWS Lightsail or EC2).

   Don't forget to allow HTTP(80) and HTTPS(443) ports!

2. Install docker and clone this repository.
```
sudo snap install docker
git clone https://www.github.com/sungpyocho/vision-for-everyone
```

3. Set .env files according to basic settings above.


4. In the project root directory, run following commands:

```
# First, build docker-compose containers
sudo docker-compose build
# Second, issue certificate from Let's Encrypt
sudo ./init-letsencrypt.sh
# If successful, stop containers and run them in the background
sudo docker-compose down
sudo docker-compose up --detach
```

These steps allow the app to run in the production mode.

Finally, go to https://kiwe.app to view it in the browser.
