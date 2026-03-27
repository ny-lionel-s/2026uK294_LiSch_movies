import api from "./api";

export type AuthData = {
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

const TOKEN_KEY = "token";


export const login = async (data: AuthData): Promise<void> => {
  try {
    const res = await api.post<AuthResponse>("/login", data);
    const token = res.data.token;
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error: any) {
    if (error.response?.status === 401) {
      throw new Error("Ungültige E-Mail oder Passwort");
    }
    throw error;
  }
};


export const register = async (data: AuthData): Promise<void> => {
  try {
    const res = await api.post<AuthResponse>("/register", data);
    const token = res.data.token;
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error("E-Mail bereits vergeben oder ungültige Daten");
    }
    throw error;
  }
};


export const logout = (): void => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.href = "/login";
};


export const isLoggedIn = (): boolean => {
  return !!localStorage.getItem(TOKEN_KEY);
};


export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};