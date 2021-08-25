/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { formatToken } from '@/utils/utils';
import { notification } from 'antd';
//  import router from 'umi/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务异常，请检查UIHApiGateway和UIHApiGatewayConfig服务状态并尝试重启，如无法解决请联系运维技术支持。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '服务异常，请联系运维技术支持。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error) => {
  const { response } = error;
  console.log(response, 'ewewew');
  if (response && response.status) {
    // const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    if (status === 401) {
      delete localStorage.userId;
      localStorage.setItem('fieldsChange', false);
      router.push('/login');
    } else {
      notification.error({
        message: '请求错误',
        description: codeMessage[status],
      });
    }
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

// request.interceptors.request.use(async (url, options) => {
//   const jwt = sessionStorage.getItem('jwt');
//   const header = {};
//   if (jwt) {
//     header.Authorization = `Bearer ${jwt}`
//   }

//   return (
//     {
//       url,
//       options: { ...options, headers: header },
//     }
//   );
// })

// response拦截器, 处理response
request.interceptors.response.use(async (response) => {
  // let data = null;
  if (response.url.includes('faq')) {
    return response;
  }
  // data = await response.clone().text();
  // const jwt = data.split('.')[1];
  // if (jwt) {
  //   data = formatToken(jwt);
  //   return data;
  // }

  return response;
});

export function requestUap(url, options) {
  return request(`${process.env.apiURL}${url}`, options);
}
export function requestUmi(url: any, options: any) {
  // console.log(url, options);
  // if (${process.env.apiURL})
  // console.log(${process.env.apiURL});
  return request(url, options);
}

export default request;
