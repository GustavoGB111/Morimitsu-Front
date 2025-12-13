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

interface beltProps {
    onUpdateBelt: (data: any) => Promise<ApiResponse>;
}

interface BeltProviderProps {
  children: ReactNode;
}

const BeltContext = createContext<beltProps | undefined>(undefined);

export const useBelt = (): beltProps => {
  const context = useContext(BeltContext);
  if (!context)
    throw new Error("useBelt deve ser usado dentro de um <beltProvider>");
  return context;
};

const updateBelt = async (data: {
    color: string,
    rqFrequency: string
}): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("my-jwt")

    const result = await api.patch("/belt/update", {
    color: data.color,
    rq_frequency: data.rqFrequency
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
);

    return {
      error: false,
      msg: result.data?.message || "Faixa atualizada com sucesso!"
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao atualizar faixa.";

    if (status === 400) msg = data?.message || "Dados faltando inválida.";
    else if (status === 404) msg = data?.message || "Usuário não encontrado";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

export const BeltProvider = ({ children }: BeltProviderProps) => {
  const value: beltProps = {
    onUpdateBelt: updateBelt
  };

  return (
    <BeltContext.Provider value={value}>
      {children}
    </BeltContext.Provider>
  );
};