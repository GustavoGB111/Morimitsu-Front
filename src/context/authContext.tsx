import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export const API_URL = "https://morimitsu-api.onrender.com/";

const api = axios.create({
  baseURL: API_URL,
});

interface AuthState {
  token: string | null;
  authenticated: boolean | null;
  username: string | null;
}

interface ApiResponse {
  error: boolean;
  msg?: string;
  status?: number;
  data?: any;
}

interface AuthProps {
  authState: AuthState;
  authReady: boolean;
  onLogin: (email: string, password: string) => Promise<ApiResponse>;
  onLogout: () => Promise<void>;
}

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = (): AuthProps => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de um <AuthProvider>");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    authenticated: null,
    username: null,
  });

  const [authReady, setAuthReady] = useState(false);

  // Carrega dados do localStorage
  useEffect(() => {
    const token = localStorage.getItem("my-jwt");
    const username = localStorage.getItem("username");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({
        token,
        authenticated: true,
        username: username || null,
      });
    } else {
      setAuthState({
        token: null,
        authenticated: false,
        username: null,
      });
    }

    setAuthReady(true);
  }, []);

  const login = async (email: string, password: string): Promise<ApiResponse> => {
    try {
      const result = await api.post(`/auth/login`, { email, password });

      // Status HTTP REAL
      const httpStatus = result.status;

      if (httpStatus === 200 || httpStatus === 201) {
        const { token, user } = result.data;

        localStorage.setItem("my-jwt", token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setAuthState({
          token,
          authenticated: true,
          username: user.username,
        });

        return { error: false, status: httpStatus, data: user };
      }

      return { error: true, msg: "Erro inesperado no login" };
    } catch (e: any) {
      return {
        error: true,
        status: e.response?.status,
        msg: e.response?.data?.message || "Erro no servidor",
      };
    }
  };

  const logout = async (): Promise<void> => {
    localStorage.clear();
    delete api.defaults.headers.common["Authorization"];
    setAuthState({
      token: null,
      authenticated: false,
      username: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        authReady,
        onLogin: login,
        onLogout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
