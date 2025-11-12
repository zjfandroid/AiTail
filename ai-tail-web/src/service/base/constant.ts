import { message } from "antd";

const WHITE_ERROR_LIST = [
  "1001", // not register
  "2001", // not login
  // "1003", // get nonce first
];

export const toast_error_code = (res: any) => {
  try {
    const { code } = res;
    if (!WHITE_ERROR_LIST.includes(code)) {
      // toast.error(res?.msg ?? "error", {
      //   position: "top-center",
      //   autoClose: 3000,
      //   theme: "light",
      // });
      console.log('res', res)
      message.error(res?.message ?? "error");
    }
  } catch (error) {
    console.log(error);
  }
};
