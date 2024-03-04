import { url } from "../constants";
import { ApiResponse } from "../../interfaces/api-response/api-response";
import { ErrorResponse } from "../../interfaces/api-response/error-response";
import toast from "react-hot-toast";

type HTTPMethod = "get" | "post" | "patch";

export const APIHandler = <T>(
  endpoint: string,
  token: string | null,
  method: HTTPMethod = "get",
  body: unknown = undefined
): Promise<ApiResponse<T>> => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
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
  return new Promise((resolve) => {
    fetch(`${url}${endpoint}`, options).then((res) => {
      if (res.ok) {
        return res.json().then((data) => {
          resolve(data);
        });
      } else {
        res.json().then((data: ErrorResponse) => {
          toast.error(data.message);
          throw new Error(data.message);
        });
      }
    });
  });
};
