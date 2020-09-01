# 키위

## 홈페이지

URL: https://kiwe.team/

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
REACT_APP_KAKAO_MAP_KEY=08cf2f37da342594fddeff0be0abbaa8
```

## When you run the app(Dev)

In the project root directory, you should run:

`docker-compose -f dev-docker-compose.yml up --build --remove-orphans`

Runs the app in the development mode.

Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

## When you run the app(Prod)

First, get any Cloud service instance(such as AWS Lightsail or EC2).

Second, clone this repository.

Third, In the project root directory, you should run:

1. `./init-letsencrypt.sh`
2. `docker-compose up --build`

Runs the app in the production mode.
Open https://kiwe.team to view it in the browser.

### 앞으로 추가해야할 기능 / 수정해야 할 버그

#### Docker, Deploy

- Master에 올리면 자동으로 lightsail에 배포(CI 구성)
- init-docker-compose.yml을 없앨 수 있는 방법 강구

#### 백엔드

- 코드 리팩토링
- TypeScript로 변경
- 회원정보 수정시, image 추가(User model에 image 항목 추가하는 로직)
- 다이얼로그플로우 대화 내역 log로 저장(winston...? 쓸까)
- 로그인 한 횟수 저장 후, 3번 이하 시 튜토리얼 추천 모달 띄우기.

#### 프론트엔드(가장 시급)

- 코드 리팩토링
- TypeScript로 변경
- [디자인 UI 확정안](https://www.figma.com/file/5MW2EAMDmQ6UtYHcaolFc4/KIWE?node-id=0%3A1)대로 모든 페이지 리디자인 진행
- Chat/Tutorial.js에서 input이 바뀔때마다 conversation이 몇번이고 출력되는 문제 수정
- 챠임 선정 및 변경
- 랜딩 페이지에서 키위 말풍선 폰트 스타일 및 폰트 크기 조정
- 채팅 페이지에서 키위봇이 다중 메시지 출력할 때, '키위봇' 이름 및 키위 아이콘이 각 말풍선마다 중복되어 보여지는 문제 수정
- 채팅 페이지에서 현재 키위 아이콘이 'K'로 나와 있는데 키위 이미지로 수정 필요
- 튜토리얼을 다 끝낸 후 사용자를 로그인/회원가입 페이지로 유도(로그인/회원가입 버튼을 제공하는 방법, ...)
- 폰트, 고대비 기능 구현 필요

#### UI 아이디어

- 사용자가 처음 랜딩페이지를에 접근했을 때 무엇을 눌러야 할지 모른다. 새를 클릭해야 넘어가는 법을 처음 사용자가 알게 하는 방법은 무엇일까요? 자동적으로 넘어가게 하거나 carousel UI처럼 가로 양끝에 앞으로 가기, 뒤로가기 화살표가 있고, 애니메이션 박스 하단에는 인스타그램처럼 총 애니메이션 개수만큼 점들이 존재한다면 사용자가 스와이핑을 통해 이전 다음 애니메이션에 접근할 수 있습니다.
- (추후 UI 관련 논의사항) 랜딩페이지에서 헤더의 홈 아이콘, 로그인 버튼 아이콘이 있는것이 어색하다는 피드백을 받았고, 현재 헤더바(홈 아이콘, 설정 아이콘, 로그인 버튼)에서 홈 아이콘, 로그인 버튼을 제외하고(아래의 '스킵하고 로그일할래요' 버튼과 기능이 중복됩니다) 설정의 고대비, 폰트 리스트 항목을 리스트에서 빼내어 폰트 아이콘, 고대비 아이콘만 헤더에 보여주는 것은 어떠한가요?

#### 다이얼로그플로우

- 다중주문 기능(대화 흐름 재설계)
