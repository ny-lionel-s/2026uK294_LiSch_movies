import { clearToken, getToken, isLoggedIn, saveToken } from "./AuthStorage";
import api from "./Api";

export type AuthData = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken?: string;
};

export const login = async (values: AuthData): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/login", values);
  const token = response.data.accessToken;

  if (!token) {
    throw new Error("Kein Token erhalten");
  }

  saveToken(token);

  return response.data;
};

export const logout = (): void => {
  clearToken();
  window.location.href = "/login";
};

export { getToken, isLoggedIn };
