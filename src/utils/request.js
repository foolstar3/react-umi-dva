/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
// import { formatToken } from '@/utils/utils';
import { notification, message } from 'antd';
import { history } from 'umi';

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
  if (response && response.status) {
    // const errorText = codeMessage[response.status] || response.statusText;
    const { status } = response;
    if (status === 401) {
      delete localStorage.qc_token;
      delete localStorage.qc_user;
      delete localStorage.openKey;
      delete localStorage.selectedKey;
      history.push('/login');
    } else if (status === 403) {
      message.error('您没有执行该操作的权限');
    }
  } else if (!response) {
    message.error('您的网络发生异常，无法连接服务器');
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  //credentials: 'include', // 默认请求是否带上cookie
});

request.interceptors.request.use((url, options) => {
  // const jwt = sessionStorage.getItem('jwt');
  const header = {};
  const token = localStorage.getItem('qc_token');
  if (token) {
    header.Authorization = token;
  }

  return {
    url,
    options: {
      ...options,
      headers: header,
    },
  };
});

// response拦截器, 处理response
request.interceptors.response.use(async (response) => {
  // let data = null;
  // console.log(response,'response-interceptors', options, 'options');
  if (response.url.includes('faq')) {
    return response;
  }
  // data = await response.clone().text();
  // const jwt = data.split('.')[1];
  // if (jwt) {
  //   data = formatToken(jwt);
  //   return data;
  // }
  // console.log(response);
  return response;
});

export function requestUap(url, options) {
  return request(`${process.env.qcFrontUrl}${url}`, options);
}
export function requestUmi(url, options) {
  return request(url, options);
}

export default request;
