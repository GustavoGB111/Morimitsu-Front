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

interface frequencyProps {
    onRegisterFrequency: (data: any) => Promise<ApiResponse>;
}

interface FrequencyProviderProps {
  children: ReactNode;
}

const FrequencyContext = createContext<frequencyProps | undefined>(undefined);

export const useFrequency = (): frequencyProps => {
  const context = useContext(FrequencyContext);
  if (!context)
    throw new Error("useFrequency deve ser usado dentro de um <frequencyProvider>");
  return context;
};

const registerFrequency = async (data: {
    studentsIds: string[],
    classId: string,
    date: string
}): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("my-jwt")

    const result = await api.put("/frequency/add", {
    studentsIds: data.studentsIds,
    classId: data.studentsIds,
    date: data.date
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
);

    return {
      error: false,
      msg: result.data?.message || "Frequência adicionada com sucesso!"
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao adicionar frequência.";

    if (status === 400) msg = data?.message || "Dados faltando inválida.";
    else if (status === 404) msg = data?.message || "Id do estudante ou Id da classe não encontrado";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

export const FrequencyProvider = ({ children }: FrequencyProviderProps) => {
  const value: frequencyProps = {
    onRegisterFrequency: registerFrequency
  };

  return (
    <FrequencyContext.Provider value={value}>
      {children}
    </FrequencyContext.Provider>
  );
};