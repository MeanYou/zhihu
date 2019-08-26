import axios from 'axios';

axios.defaults.withCredentials = true;
let baseUrl;
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = '/';
    break;
  case 'production':
    baseUrl = '/';
    break;
  case 'test':
    baseUrl = '/';
    break;
  default:
    baseUrl = '/';
    break;
}

// create an axios instance
const service = axios.create({
  baseURL: baseUrl, // api 的 base_url
  // timeout: 10000, // request timeout
});

// request interceptor
service.interceptors.request.use(
  // Do something before request is sent
  // if (store.getters.token) {
  //   config.headers['token'] = getToken()
  // },
  config => {
    // config.headers['Authentication'] = localStorage.getItem('Authentication');
    return config;
  },
  (error) => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  },
);

// response interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 自定义不同code表示不同问题，对不同情况作出处理
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合需求加以修改，若不需要，则可删除
   */
  (response) => {
    const res = response.data;
    // response.headers.token && localStorage.setItem('Authentication', response.headers.token);
    return res;
    // return Promise.reject(response.data.msg);
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

// jsonp
// const requestJsonp = (url, opts) => new Promise((resolve, reject) => {
//   jsonp(url, opts, (err, data) => {
//     if (err) {
//       reject(err);
//     } else if (data.status === '1') {
//       resolve(data);
//     } else {
//       reject(data);
//     }
//   });
// }).catch((err) => {
//   console.log(err);
// });

// export { requestJsonp };
export { baseUrl };
export default service;
