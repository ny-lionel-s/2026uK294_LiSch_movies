import api from "./api";

export type AuthData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

const TOKEN_KEY = "token";

export const login = async (values: { email: string; password: string }) => {
  const res = await api.post("/login", values);
  if (!res.data.accessToken) {
    throw new Error("Kein Token erhalten");
  }
  localStorage.setItem("token", res.data.accessToken);
  return res.data;
};

export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/login";
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isLoggedIn = () => !!localStorage.getItem("token");