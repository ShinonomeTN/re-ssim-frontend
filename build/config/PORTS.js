module.exports = {
  forBrowserSync : 4200,
  forDevServer: 8000,
  forMockServer: 8080,
  
  BROWSER_SYNC: 4200,  // BrowserSync 调试服务器
  DEV_SERVER: 8000,    // Express + Webpack 热替换开发服务器，且提供静态资源支持
  MOCK_SERVER: 8080    // RESTful API Mock 服务器
};
