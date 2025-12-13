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
    onRegisterFromStudent: (data: any) => Promise<ApiResponse>;
    onUpdateUser: (data: any) => Promise<ApiResponse>;
    onGetUser: () => Promise<ApiResponse>;
    onDeleteUser: (id: string) => Promise<ApiResponse>;
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

    const result = await api.post("/user/create", {
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

    return {
      error: false,
      msg: result.data?.message || "User cadastrado com sucesso!"
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao cadastrar aluno.";

    if (status === 400) msg = data?.message || "Dados faltando inválida.";
    else if (status === 403) msg = data?.message || "Você não tem permissão de acesso a essa rota.";
    else if (status === 409) msg = data?.message || "User já existe.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
}

const registerFromStudent = async (data: {
  studentId: string;
  email: string;
  password: string;
}): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("my-jwt")

    const result = await api.post("/user/createFromStudent", {
      studentId: data.studentId,
      email: data.email,
      password: data.password
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
);

    return {
      error: false,
      msg: result.data?.message || "User cadastrado com sucesso!"
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao cadastrar aluno.";

    if (status === 400) msg = data?.message || "Dados faltando inválida.";
    else if (status === 403) msg = data?.message || "Você não tem permissão de acesso a essa rota.";
    else if (status === 409) msg = data?.message || "User já existe.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
}

const updateUser = async (data: {
  name?: string,
  email?: string,
  password?: string,
  cpf?: string,
  phoneNumber?: string
}): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("my-jwt")

    const result = await api.put("/user/update", {
      name: data.name,
      email: data.email,
      password: data.password,
      cpf: data.cpf,
      phoneNumber: data.phoneNumber
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
);

    return {
      error: false,
      msg: result.data?.message || "User cadastrado com sucesso!",
      data: result.data
    };
  } catch (e: any) {
      const status = e.response?.status;
      const data = e.response?.data;

      let msg = "Erro ao atualizar usuário.";

      if (status === 400) msg = data?.message || "Dados faltando ou inválidos.";
      else if (status === 404) msg = data?.message || "Usuário não encontrado.";
      else if (status === 409) msg = data?.message || "Conflito de dados.";
      else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
      else if (status >= 500) msg = "Erro interno no servidor.";

      return {
        error: true,
        status,
        msg
      };
    }
}

const getUser = async(): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("my-jwt");
    const result = await api.get("/user/get", {headers: {Authorization: `Bearer ${token}`}});

    return {
      error: false,
      msg: result.data?.message || "User cadastrado com sucesso!",
      data: result.data
    };
  } catch (e: any) {
      const status = e.response?.status;
      const data = e.response?.data;

      let msg = "Erro ao atualizar usuário.";

      if (status === 404) msg = data?.message || "Usuário não encontrado.";
      else if (status >= 500) msg = "Erro interno no servidor.";

      return {
        error: true,
        status,
        msg
      };
    }
}

const deleteUser = async (id: string): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("my-jwt");
    const result = await api.delete(`/user/delete/${id}`, {headers: {Authorization: `Bearer ${token}`}});

    return {
      error: false,
      msg: result.data?.message || "User cadastrado com sucesso!",
      data: result.data
    };
  } catch (e: any) {
      const status = e.response?.status;
      const data = e.response?.data;

      let msg = "Erro ao atualizar usuário.";

      if (status === 404) msg = data?.message || "Usuário não encontrado.";
      else if (status >= 500) msg = "Erro interno no servidor.";

      return {
        error: true,
        status,
        msg
      };
    }
}


export const UserProvider = ({ children }: UserProviderProps) => {
  const value: userProps = {
    onRegisterUser: registerUser,
    onRegisterFromStudent: registerFromStudent,
    onUpdateUser: updateUser,
    onGetUser: getUser,
    onDeleteUser: deleteUser
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};