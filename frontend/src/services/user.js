import { storeCache } from "../utils/cache";
import { methodService, apiService } from "./apiService";
import { toast } from "react-toastify";

export const URL = {
  BASE_URL: "/users",
  LOGIN_URL: "/users/login",
};

export const login = async (values) => {
  try {
    let response = await apiService(
      URL.LOGIN_URL,
      methodService.POST,
      values,
      null
    );

    if (response.data.user) {
      const { user, token } = response.data;
      storeCache("user", JSON.stringify({ user, token }));
    }

    toast.success("Login successful!");

    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message);
  }
};

export const getUsers = () => {
  return apiService(URL.BASE_URL, methodService.GET, null, null);
};

export const createUser = (values) => {
  return apiService(URL.BASE_URL, methodService.POST, values, null);
};
