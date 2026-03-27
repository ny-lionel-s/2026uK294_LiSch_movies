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
  const res = await api.post("/login", values); // POST an Backend
  if (!res.data.accessToken) {
    throw new Error("Kein Token erhalten");
  }
  // Token sofort speichern
  localStorage.setItem("token", res.data.accessToken);
  return res.data;
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


export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const isLoggedIn = () => !!localStorage.getItem("token");