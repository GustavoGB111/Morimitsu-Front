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

interface reportProps {
    onGetReportSearch: (data: any) => Promise<ApiResponse>;
    onGetReportBirthday: (data: any) => Promise<ApiResponse>;
}

interface ReportProviderProps {
  children: ReactNode;
}

const ReportContext = createContext<reportProps | undefined>(undefined);

export const useReport = (): reportProps => {
  const context = useContext(ReportContext);
  if (!context)
    throw new Error("useReport deve ser usado dentro de um <reportProvider>");
  return context;
};

const getReportSearch  = async (data: {
    id: string,
    text: string,
    title: string,
    maxDate: string,
    minDate: string
}): Promise<ApiResponse> => {
  try {
    ///class/search?name=blablabla&type=blablabla
    let query;
    let itsFirst = true;

    if (data.id !== undefined) {
        itsFirst = false;
        query = `id=${data.id}`
    }
        if (data.text !== undefined) {
            if (itsFirst === true) {
                itsFirst = false;
                query = `text=${data.text}`
            } else {
                query = `${query}&text=${data.text}`
            }
    }
        if (data.title !== undefined) {
            if (itsFirst === true) {
                itsFirst = false;
                query = `title=${data.title}`
            } else {
                query = `${query}&title=${data.title}`
            }
    }
        if (data.maxDate !== undefined) {
            if (itsFirst === true) {
                itsFirst = false;
                query = `maxDate=${data.maxDate}`
            } else {
                query = `${query}&maxDate=${data.maxDate}`
            }
    }
        if (data.minDate !== undefined) {
            if (itsFirst === true) {
                itsFirst = false;
                query = `minDate=${data.minDate}`
            } else {
                query = `${query}&minDate=${data.minDate}`
            }
    }

    const token = localStorage.getItem("my-jwt")
    const result = await api.get(`/report/search?${query}`,
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
);

    return {
      error: false,
      msg: result.data?.message || "Report feito com sucesso!",
      data: result.data
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao solicitar o report.";

    if (status === 404) msg = data?.message || "Usuário não encontrado";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

const getReportBirthday = async (): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("my-jwt")
    const result = await api.put("/report/birthday", {
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
);

    return {
      error: false,
      msg: result.data?.message || "Report realizado com sucesso!",
      data: result.data
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao solicitar report.";

    if (status === 404) msg = data?.message || "Usuário não encontrado";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }  
}

export const ReportProvider = ({ children }: ReportProviderProps) => {
  const value: reportProps = {
    onGetReportSearch: getReportSearch,
    onGetReportBirthday: getReportBirthday
  };

  return (
    <ReportContext.Provider value={value}>
      {children}
    </ReportContext.Provider>
  );
};