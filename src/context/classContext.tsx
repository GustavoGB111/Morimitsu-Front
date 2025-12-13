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

interface classProps {
    onRegisterClass: (data: any) => Promise<ApiResponse>;
    onRegisterStudentInClass: (data: any) => Promise<ApiResponse>;
    onGetStudentOfClass: (classId: string) => Promise<ApiResponse>;
    onGetClass: (data: any) => Promise<ApiResponse>;
    onUpdateClass: (data: any) => Promise<ApiResponse>;
}

interface ClassProviderProps {
  children: ReactNode;
}

const ClassContext = createContext<classProps | undefined>(undefined);

export const useClass = (): classProps => {
  const context = useContext(ClassContext);
  if (!context)
    throw new Error("useClass deve ser usado dentro de um <ClassProvider>");
  return context;
};

const registerClass = async (data: {
    instructorId: string,
    requireFq?: 0,
    name: string,
    type: string
}): Promise<ApiResponse> => {
      try {
    const token = localStorage.getItem("my-jwt")
    let result = {
        data: {message: "mensagem teste"},
        status: 200
    };
    if (data.type === "kids" && !!data.requireFq) {
        result = await api.post("/class/create", {
        instructorId: data.instructorId,
        requireFq: data.requireFq,
        name: data.name,
        type: "kids" 
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
    );
    }
    else if (data.type === "mista"){
        result = await api.post("/class/create", {
        instructorId: data.instructorId,
        name: data.name,
        type: "mista" 
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    });
    } 
    else if (data.type === "normal"){
        result = await api.post("/class/create", {
        instructorId: data.instructorId,
        name: data.name,
        type: "normal" 
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    });
    }
    else {
        result = {
        data: {message: "Type não cumpriu os requisitos."},
        status: 404
    };
    }

    return {
      error: false,
      msg: result.data?.message || "Classe cadastrada com sucesso!"
    };
    
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao cadastrar classe.";

    if (status === 400) msg = data?.message || "Dados faltando.";
    else if (status === 403) msg = data?.message || "Você não tem permissão de acesso a essa rota.";
    else if (status === 404) msg = data?.message || "User não foi encontrado.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
}

const registerStudentInClass = async ( data: {
studentsIds: string[],
classId: string
}): Promise<ApiResponse> => {
    try {
    const token = localStorage.getItem("my-jwt")
    const result = await api.put("/class/add/students", {
      studentsIds: data.studentsIds,
      classId: data.classId
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
    );

    return {
      error: false,
      msg: result.data?.message || "aluno cadastrado com sucesso na classe!"
    };
    
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao cadastrar aluno na classe.";

    if (status === 400) msg = data?.message || "Dados faltando.";
    else if (status === 404) msg = data?.message || "Estudante não foi encontrado.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
}

const getStudentsOfClass = async (classId: string): Promise<ApiResponse> => {
    try {
    const token = localStorage.getItem("my-jwt")
    const result = await api.get(`/class/get/students/${classId}`,
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
    );

    return {
      error: false,
      msg: result.data?.message || "Estudante encontrado com sucesso!",
      data: result.data?.message
    };
    
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao encontrar aluno.";

    if (status === 404) msg = data?.message || "Classe não foi encontrada.";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
}

const getClass = async (data: {
  name?: string,
  type?: string
}): Promise<ApiResponse> => {
    try {
      let query;
      let itsFirst = true;

    if (data.name != undefined) {
      itsFirst = false
      query = `name=${data.name}`
    }
    if (data.type != undefined) {
      if (itsFirst === true) {
        query = `type=${data.type}`
        itsFirst = false
      }
      else {
        query = `${query}&type=${data.type}`
      }
    }
    if (!data.name && !data.type) {
      throw new Error("Parâmetros inválidos");
    }

    const token = localStorage.getItem("my-jwt")
    const result = await api.get(`/class/search?${query}`,
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
    );

    return {
      error: false,
      msg: result.data?.message || "Classe encontrada com sucesso!",
      data: result.data?.message
    };
    
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao achar classe.";

    if (status === 404) msg = data?.message || "Classe não foi encontrada.";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
}

const updateClass = async (data: {
  classId: string,
  name?: string,
  instructorId?: string,
  requireFq?: string
}): Promise<ApiResponse> => {
    try {
    const token = localStorage.getItem("my-jwt")
    const result = await api.put("/class/update", {
      classId: data.classId,
      name: data.name,
      instructorId: data.instructorId,
      requireFq: data.requireFq
    },{
    headers: {
    Authorization: `Bearer ${token}`
      }
    }
    );

    return {
      error: false,
      msg: result.data?.message || "Classe atualizada com sucesso!",
      data: result.data?.message
    };
    
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao atualizar classe.";

    if (status === 400) msg = data?.message || "Dados faltando.";
    else if (status === 404) msg = data?.message || "Classe não foi encontrada.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
}

export const ClassProvider = ({ children }: ClassProviderProps) => {
  const value: classProps = {
    onRegisterClass: registerClass,
    onRegisterStudentInClass: registerStudentInClass,
    onGetStudentOfClass: getStudentsOfClass,
    onGetClass: getClass,
    onUpdateClass: updateClass
  };

  return (
    <ClassContext.Provider value={value}>
      {children}
    </ClassContext.Provider>
  );
};