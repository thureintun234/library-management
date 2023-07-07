import axios from "axios";
import { getCache } from "../utils/cache";
const API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:3001" + "/api/v1";

export const methodService = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const config = {
  baseURL: API_URL,
  timeout: 10000,
};

const getHeaders = async (isMultipart) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": isMultipart ? "multipart/form-data" : "application/json",
  };

  const token = getCache("user");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

const instance = axios.create(config);

instance.interceptors.request.use(async (request) => {
  request.headers = await getHeaders(request.multipart);
  return request;
});

export const apiService = async (
  url,
  method,
  data,
  params,
  multipart = false
) => {
  const service = await instance({
    url: url,
    method: method,
    data: data,
    params: params,
    timeout: 60000,
    multipart,
  });

  return service;
};
