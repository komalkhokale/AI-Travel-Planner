import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api",
});

export const registerUser =
  async (data: any) => {
    const response =
      await API.post(
        "/auth/register",
        data,
      );

    return response.data;
  };

export const loginUser =
  async (data: any) => {
    const response =
      await API.post(
        "/auth/login",
        data,
      );

    return response.data;
  };