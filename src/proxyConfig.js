const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/api",
    proxy({
      target: 'https://feriapp.test.mia-platform.eu/api',
      changeOrigin: true
    })
  );
};