import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type signupPayload = {
  name: string;
  email: string;
  password: string;
};

type singinPayload = {
  email: string;
  password: string;
};

type authResponse = {
  message: string;
  success: boolean;
  token: string;
};

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuth = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();
  const navigate = useNavigate();

  const signup = async (payload: signupPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<authResponse>(
        `${BASE_URL}/api/v1/user/singup`,
        payload
      );
      const token = response.data?.token;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (error: any) {
      setError(error.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const signin = async (payload: singinPayload) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post<authResponse>(
        `${BASE_URL}/api/v1/user/signin`,
        payload
      );
      const token = response.data?.token;
      localStorage.setItem("token", token);
      navigate("/blogs");
    } catch (error: any) {
      setError(error.response?.data?.message || "something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return {
    signup,
    signin,
    loading,
    error,
  };
};
