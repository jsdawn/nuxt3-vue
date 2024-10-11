import { useAppStore } from '@/store/useAppStore';

const service = $fetch.create({
  // 超时时长ms
  timeout: 60000,

  // 请求拦截
  onRequest({ request, options }) {
    const store = useAppStore();
    // 请求前缀url
    options.baseURL =
      process.env.NODE_ENV === 'development'
        ? '/proxyApi'
        : useRuntimeConfig().public.apiBase;

    // 是否允许数据重复提交，默认不允许
    const isRepeatSubmit = (options.headers || {}).repeatSubmit === false;

    options.method = options.method?.toUpperCase() || 'GET';
    // 请求拦截相关配置
    options.headers = {
      Accept: 'application/json',
      Authorization: store.token || '',
    };

    // --start 防止重复提交--
    if (!isRepeatSubmit && (options.method === 'POST' || options.method === 'PUT')) {
      const requestObj = {
        url: request.url,
        data:
          typeof options.body === 'object' ? JSON.stringify(options.body) : options.body,
        time: new Date().getTime(),
      };
      const requestSize = Object.keys(JSON.stringify(requestObj)).length; // 请求数据大小
      const limitSize = 5 * 1024 * 1024; // 限制存放数据5M
      if (requestSize >= limitSize) {
        console.warn(
          `[${request.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。',
        );
        return;
      }

      let sessionObj = store.requestObj;
      sessionObj = sessionObj ? JSON.parse(sessionObj) : null;
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        store.setRequestObj(JSON.stringify(requestObj));
      } else {
        const s_url = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
        if (
          s_data === requestObj.data &&
          requestObj.time - s_time < interval &&
          s_url === requestObj.url
        ) {
          const message = '数据正在处理，请勿重复提交';
          console.warn(`[${s_url}]: ` + message);
          return Promise.reject(new Error(message));
        } else {
          store.setRequestObj(JSON.stringify(requestObj));
        }
      }
    }
    // --end 防止重复提交--
  },
  // 请求错误拦截
  onRequestError(error) {
    // console.log(error, '请求错误拦截');
    return Promise.reject(error);
  },

  // 响应拦截
  onResponse({ response: res }) {
    // 未设置状态码则默认成功状态
    const code = res.status || 200;
    // 二进制数据则直接返回
    if (res.type === 'blob' || res.type === 'arraybuffer') {
      return res._data;
    }

    if (code === 401) {
      navigateTo('/login');
      console.error('用户认证失效，请重新登录');
      return Promise.reject(new Error('用户认证失效，请重新登录'));
    } else if (code !== 200) {
      let message = res.statusText || '服务器开小差了';
      if (res._data && res._data.msg) {
        message = res._data.msg;
      }
      console.error(message);
      return Promise.reject(new Error(message));
    } else {
      return Promise.resolve(res._data); // 返回响应体 data
    }
  },
  // 响应错误拦截
  onResponseError(error) {
    showError(error);
    return Promise.reject(error);
  },
});

function request({ url, method, params, data, ...options }) {
  return service(url, {
    ...options,
    method: method || 'get',
    params: params,
    body: data || null,
  });
}

export default request;
