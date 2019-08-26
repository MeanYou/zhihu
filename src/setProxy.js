import proxy from 'http-proxy-middleware';

export default function(app) {
  app.use('/user/*', proxy({ target: '' }));// 服务器地址
};