/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

export const API_URL = "https://morimitsu-api.onrender.com/";

const api = axios.create({
  baseURL: API_URL,
});

interface ApiResponse {
  error: boolean;
  msg?: string;
  status?: number;
  data?: any;
}

interface userProps {
    onRegisterUser: (data: any) => Promise<ApiResponse>;
}

interface UserProviderProps {
  children: ReactNode;
}

const UserContext = createContext<userProps | undefined>(undefined);

export const useUser = (): userProps => {
  const context = useContext(UserContext);
  if (!context)
    throw new Error("useUser deve ser usado dentro de um <UserProvider>");
  return context;
};

const registerUser = async (data: {
    cpf: string;
    email: string;
    password: string;
    name: string;
    beltId: string;
    phoneNumber: string
}): Promise<ApiResponse> => {
      try {
    const token = localStorage.getItem("my-jwt")

    const result = await api.post("/student/create", {
        cpf: data.cpf,
        email: data.email,
        password: data.password,
        name: data.name,
        belt_id: data.beltId,
        phoneNumber: data.phoneNumber
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
);

    const { id } = result.data;
    localStorage.setItem("id", id);

    return {
      error: false,
      msg: result.data?.message || "Aluno cadastrado com sucesso!",
      data: result.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao cadastrar aluno.";

    if (status === 400) msg = data?.message || "Dados faltando inválida.";
    else if (status === 409) msg = data?.message || "Aluno já existe.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }

}

export const UserProvider = ({ children }: UserProviderProps) => {
  const value: userProps = {
    onRegisterUser: registerUser,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};