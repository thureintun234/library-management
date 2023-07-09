import { storeCache } from "../utils/cache";
import { methodService, apiService } from "./apiService";
import { toast } from "react-toastify";

export const URL = {
  BASE_URL: "/users",
  LOGIN_URL: "/users/login",
};

export const login = async (values, isLibrarian = false) => {
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

    const { role } = response.data.user;

    if (role === "Librarian" && isLibrarian) {
      toast.success("Login successful!");
    } else if (role === "User" && !isLibrarian) {
      toast.success("Login successful!");
    } else if (role !== "Librarian" && isLibrarian) {
      toast.error("Only Librarian is authorized to Login");
    }

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
  try {
    return apiService(URL.BASE_URL, methodService.POST, values, null);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message);
  }
};
