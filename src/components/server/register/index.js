import axios from "axios";
import apiClient from "../axiosConfig";

export const registerUser = async (user) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/sign-up`,
      user
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const loginHandler = async (login) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/login`,
      login
    );
    return response.data;
  } catch (err) {
    throw err;
  }
};
