import proxy from 'http-proxy-middleware';

export default function(app) {
  app.use('/feed/*', proxy({ target: 'https://www.zhihu.com/api/v3/feed' }));// 服务器地址
};