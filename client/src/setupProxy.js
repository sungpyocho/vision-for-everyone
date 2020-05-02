// 프록시 서버 설정하는 법. 3000포트(클라이언트) 요청 => 5000번포트(서버)로 연결
// package.json에 proxy: "http://localhost:5000"이라고 설정하는 방법도 있음.
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000', // 서버 포트(:5000)
      changeOrigin: true,
    })
  );
};