/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
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
}

interface ApiResponse {
  error: boolean;
  msg: string;
  status?: number;
  data?: any;
}

interface AuthProps {
  authState: AuthState;
  authReady: boolean;
  onLogin: (email: string, password: string) => Promise<ApiResponse>;
  onLogout: () => Promise<void>;
  onChange: (email: string, password: string) => Promise<ApiResponse>;
  onPassword: (password: string) => Promise<ApiResponse>;
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
    authenticated: null
  });

  const [authReady, setAuthReady] = useState(false);

  // Carrega dados do localStorage
  useEffect(() => {
    const token = localStorage.getItem("my-jwt");

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAuthState({
        token,
        authenticated: true
      });
    } else {
      setAuthState({
        token: null,
        authenticated: false
      });
    }

    setAuthReady(true);
  }, []);

const login = async (email: string, password: string): Promise<ApiResponse> => {
  try {
    const result = await api.post(`/auth/login`, { email, password });

    const status = result.status; // <-- STATUS DO AXIOS

    switch (status) {
      case 201: {
        const { token } = result.data;

        localStorage.setItem("my-jwt", token);

        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        setAuthState({
          token,
          authenticated: true,
        });

        return {
          error: false,
          msg: "Usuário logado com sucesso",
          status
        };
      }

      default:
        return {
          error: true,
          msg: `Status inesperado (${status})`,
          status,
        };
    }

  } catch (error: any) {

    // Esses status vêm do AXIOS, mesmo sem vir no body
    const status = error.response?.status || 0;

    // Comparação com os códigos da imagem
    if (status === 400) {
      return {
        error: true,
        msg: "Senha incorreta",
        status,
      };
    }

    if (status === 404) {
      return {
        error: true,
        msg: "Usuário não encontrado",
        status,
      };
    }

    if (status === 422) {
        return {
        error: true,
        msg: "Formato de Email inválido",
        status,
      };
    }

    if (status === 500) {
      return {
        error: true,
        msg: "Erro desconhecido no servidor",
        status,
      };
    }

    // Se não chegar em nenhum
    return {
      error: true,
      msg: "Erro inesperado",
      status,
    };
  }
};

  const logout = async (): Promise<void> => {
    localStorage.clear();
    delete api.defaults.headers.common["Authorization"];
    setAuthState({
      token: null,
      authenticated: false
    });
  };

  const change = async (name: string, password: string): Promise<ApiResponse> => {
    const token = localStorage.getItem("my-jwt")
    const res = await api.put(`/user/update`, { name, password, headers:{Authorization:`Bearer${token}`} }) 
    const status = res.status
    
    switch (status) {
      case 200: {
        const { name } = res.data;

        localStorage.setItem("name", name);

        return {
          error: false,
          msg: "Usuário logado com sucesso",
          status
        };
      }

      default:
        return {
          error: true,
          msg: `Status inesperado (${status})`,
        };
    }
  } 

  const changePassword = async (password: string): Promise<ApiResponse> => {
    const token = localStorage.getItem("my-jwt")
    const res = await api.put(`/user/update`, { password, headers:{Authorization:`Bearer${token}`} }) 
    const status = res.status
    
    switch (status) {
      case 200: {


        return {
          error: false,
          msg: "Usuário logado com sucesso",
          status
        };
      }

      default:
        return {
          error: true,
          msg: `Status inesperado (${status})`,
        };
    }
  } 

  return (
    <AuthContext.Provider
      value={{
        authState,
        authReady,
        onLogin: login,
        onLogout: logout,
        onChange: change,
        onPassword: changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
