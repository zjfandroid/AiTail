import { TResData } from "../type";
import { toast_error_code } from "./constant";
import { interceptors, Cfetch } from "./fetch";
// import loginState from "@/utils/loginState";

/**
 * config 自定义配置项
 * @param withoutCheck 不使用默认的接口状态校验，直接返回 response
 * @param returnOrigin 是否返回整个 response 对象，为 false 只返回 response.data
 * @param showError 全局错误时，是否使用统一的报错方式
 * @param canEmpty 传输参数是否可以为空
 * @param mock 是否使用 mock 服务
 * @param timeout 接口请求超时时间，默认10秒
 */
let configDefault: any = {
  showError: true,
  canEmpty: false,
  returnOrigin: false,
  withoutCheck: false,
  mock: false,
  timeout: 10000,
};

// 结果处理，fetch请求响应结果是promise，还得处理
async function resultReduction(response: any) {
  let res = "";
  switch (configDefault.responseType) {
    case "json":
      res = await response.json();
      break;
    case "text":
      res = await response.text();
      break;
    case "blod":
      res = await response.blod();
      break;
    default:
      res = await response.json();
      break;
  }
  return res;
}

// 添加请求拦截器
interceptors.request.use((config: any) => {
  // const token = loginState.getToken();
  configDefault = Object.assign(
    {
      responseType: "json",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        // AuthorizationToken: `Token ${token}`,
      },
    },
    configDefault,
    config,
  );
  // if (!token) {
  //   delete configDefault.headers.AuthorizationToken;
  // } else {
  //   configDefault.headers.AuthorizationToken = `Token ${token}`;
  // }
  return configDefault;
});

// 添加响应拦截器
interceptors?.response?.use(async (response: any) => {
  // TODO: 这里是复制一份结果处理，在这里可以做一些操作
  const res: any = await resultReduction(response?.clone());

  // HTTP 状态码 2xx 状态入口，data.code 为 200 表示数据正确，无任何错误
  if (response.status >= 200 && response.status < 300) {
    // eslint-disable-next-line eqeqeq
    if (res?.success) {
      return res;
    } else {
      if (res.code === 209252 || res.code === 209301) {
        console.log("token过期");
        // loginState.clearLoginState();
        // if (window.location.pathname !== "/login") {
        //   window.location.href = "/login";
        // }
        return Promise.reject(res);
        // loginState.clear();
      } else {
        toast_error_code(res);
        return Promise.reject(res);
      }
    }
  } else {
    // 非 2xx 状态入口
    if (configDefault.withoutCheck) {
      // 不进行状态状态检测
      return Promise.reject(response);
    }
    return Promise.reject(response);
  }
});



function request<T>(method: string, path: string, data?: any, config?: any): Promise<T> {
  if (method === "GET") {
    let params: any = "";
    if (data) {
      const newParams = data ? JSON.stringify(data) : "";
      // 对象转url参数
      params = newParams
        ? newParams
          ?.replace(/:/g, "=")
          .replace(/"/g, "")
          .replace(/,/g, "&")
          .match(/\{([^)]*)\}/)?.[1]
        : newParams;
    }
    let initConfig = {
      ...configDefault,
      ...config,
      method,
    };
    delete initConfig.body;
    delete configDefault.body;
    if (params) {
      return Cfetch(`${path}?${params}`, initConfig);
    }
    return Cfetch(`${path}`, initConfig);
  } else {
    // application/x-www-form-urlencoded 格式需要单独处理data
    if (config?.headers?.["type"] === "form") {
      // 将对象转换为 URL 编码的格式
      const formData = new URLSearchParams();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
      let myInit = {
        ...configDefault,
        ...{
          ...config,
          headers: {
            ...config.headers,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
        body: formData.toString(),
        method,
      };
      return Cfetch(path, myInit);
    }
    // const token = loginState.getToken();
    let myInit = {
      ...configDefault,
      ...{
        ...config,
        headers: {
          "Content-Type": "application/json;charset=utf-8",
          // AuthorizationToken: `Token ${token}`,
        },
      },
      body: JSON.stringify(data),
      method,
    };
    return Cfetch(path, myInit);
  }
}

// get请求方法使用封装
function get<T>(path: string, data?: any, config?: any): Promise<TResData<T>> {
  return request("GET", path, data || undefined, config);
}

// post请求方法使用封装
function post<T>(path: string, data: any, config?: any): Promise<TResData<T>> {
  return request("POST", path, data, config);
}

// put请求方法使用封装
function put<T>(path: string, data: any, config?: any): Promise<TResData<T>> {
  return request("PUT", path, data, config);
}

// delete请求方法使用封装
function del<T>(path: string, data: any, config?: any): Promise<TResData<T>> {
  return request("DELETE", path, data, config);
}

// patch请求方法使用封装
function patch<T>(path: string, data: any, config?: any): Promise<TResData<T>> {
  return request("PATCH", path, data, config);
}

const fetchApi = {
  fetch: Cfetch,
  get,
  post,
  put,
  delete: del,
  patch
};

export default fetchApi;
