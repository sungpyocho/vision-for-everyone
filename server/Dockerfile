# 예를 들어, 지금까지 Docker 없이 어떻게 개발 작업을 진행했는지 돌이켜보겠습니다.

# NodeJS 설치
# 디렉터리 생성
# package.json 파일 생성
# Express 패키지 설치
# 코드 작성
# 애플리케이션 구동
# 이렇게 우리가 하나씩 직접했던 작업을 Dockefile에 그대로 녹인다고 생각하면서, 필요한 명령어를 나열해보면 다음과 같습니다.

FROM node:latest

# Create App Directory
RUN mkdir -p /usr/app/server
WORKDIR /usr/app/server

# Install Dependencies
COPY package*.json ./
RUN npm ci

# 앱 소스 추가
COPY . .

# Exports
EXPOSE 5000

CMD [ "npm", "run", "backend" ]
