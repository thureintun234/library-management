import { methodService, apiService } from "./apiService";
import { toast } from "react-toastify";

export const URL = {
  BASE_URL: "/books",
  UPLOAD_URL: "/uploads",
};

export const createBook = async (values) => {
  try {
    let response = await apiService(
      URL.BASE_URL,
      methodService.POST,
      values,
      null,
      true
    );
    return response.data;
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message);
  }
};

export const getBooks = () => {
  try {
    return apiService(URL.BASE_URL, methodService.GET, null, null);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message);
  }
};

export const borrowBook = (bookId) => {
  try {
    return apiService(`${URL.BASE_URL}/${bookId}`, methodService.PUT, {}, null);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message);
  }
};
