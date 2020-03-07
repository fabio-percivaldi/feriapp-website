import config from './config'
const API_GATEWAY_URL = config.apiGateway.URL
const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/api/getIgMedia",
    proxy({
      target: API_GATEWAY_URL,
      changeOrigin: true
    })
  );
};