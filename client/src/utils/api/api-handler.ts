import { URL_API_FLAMI, URL_API_MAP } from "../constants";

import { ApiResponse } from "../../interfaces/api-response/api-response";
import { ErrorResponse } from "../../interfaces/api-response/error-response";
import toast from "react-hot-toast";

type HTTPMethod = "get" | "post" | "patch";

export const APIHandler = <T>(
  endpoint: string,
  isMap: boolean = false,
  method: HTTPMethod = "get",
  body: unknown = undefined,
  token: string | null = null
): Promise<ApiResponse<T>> => {
  const headers = new Headers();
  const url = isMap ? URL_API_MAP : URL_API_FLAMI;
  // if(isMap) {
  //   headers.append("Authorization", `Bearer ${URL_API_KEY}`);
  // }
  if (token) {
    headers.append("Authorization", `Bearer ${token}`);
  }
  const options: RequestInit = {
    method,
    headers,
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  // const fetchData = async () => {
  //   console.log(endpoint);
  //   console.log(options);
  //   try {
  //     const response = await fetch(`${url}${endpoint}`, {
  //       method: "get",
  //       headers,
  //     });
  //     response.json().then((res) => console.log(res));
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // fetchData();

  return new Promise((resolve, reject) => {
    console.log("start fetch");
    fetch(`${url}${endpoint}`, options).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          resolve(data);
        });
      } else {
        res.json().then((data: ErrorResponse) => {
          reject(data);
          toast.error(data.message);
        });
      }
    });
  });
};
