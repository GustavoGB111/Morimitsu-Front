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

interface studentProps {
  onRegisterStudent: (data: any) => Promise<ApiResponse>;
  onDeleteStudent: (id: number) => Promise<ApiResponse>;
  onPutStudent: (id: number, data: any) => Promise<ApiResponse>;
  onGetStudent: (data: any) => Promise<ApiResponse>;
  onGetStudentByBirthday: () => Promise<ApiResponse>;
  onGetStudentGradable: () => Promise<ApiResponse>;
}

interface StudentProviderProps {
  children: ReactNode;
}

const StudentContext = createContext<studentProps | undefined>(undefined);

export const useStudent = (): studentProps => {
  const context = useContext(StudentContext);
  if (!context)
    throw new Error("useStudent deve ser usado dentro de um <StudentProvider>");
  return context;
};

// POST — criar aluno
const registerStudent = async (studentData: {
  cpf: string;
  age: number;
  gender: "man" | "woman";
  birthday: string;
  nickname: string;
  currentFq: number;
  fullname: string;
  guardianName: string;
  phoneNumber: string;
  guardianNumber: string;
  beltId: string;
}): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("my-jwt")

    const result = await api.post("/student/create", {
      cpf: studentData.cpf,
      age: studentData.age,
      gender: studentData.gender,
      birthday: studentData.birthday,
      nickname: studentData.nickname,
      currentFq: studentData.currentFq,
      fullName: studentData.fullname,
      guardianName: studentData.guardianName,
      phoneNumber: studentData.phoneNumber,
      guardianNumber: studentData.guardianNumber,
      beltId: studentData.beltId,
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
};


// DELETE — deletar aluno
const deleteStudent = async (id: number): Promise<ApiResponse> => {
  try {
    const result = await api.delete(`/student/delete/${id}`);

    return {
      error: false,
      msg: result.data?.message || "Aluno deletado com sucesso!",
      data: result.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao deletar aluno.";

    if (status === 400) msg = data?.message || "ID inválido.";
    else if (status === 404) msg = data?.message || "Aluno não encontrado.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

// PUT — atualizar aluno
const putStudent = async (id: number, studentData: {
  cpf: string;
  age: number;
  gender: "man" | "woman";
  birthday: string;
  nickname: string;
  currentFq: number;
  fullname: string;
  guardianName: string;
  phoneNumber: string;
  guardianNumber: string;
  beltId: string;
}): Promise<ApiResponse> => {
  
  try {

    const token = localStorage.getItem("my-jwt")

    const result = await api.put(`/student/update/${id}`, {
      cpf: studentData.cpf,
      age: studentData.age,
      gender: studentData.gender,
      birthday: studentData.birthday,
      nickname: studentData.nickname,
      currentFq: studentData.currentFq,
      fullName: studentData.fullname,
      guardianName: studentData.guardianName,
      phoneNumber: studentData.phoneNumber,
      guardianNumber: studentData.guardianNumber,
      beltId: studentData.beltId,
    },
    {
    headers: {
    Authorization: `Bearer ${token}`
      }
    });

    return {
      error: false,
      msg: result.data?.message || "Aluno atualizado com sucesso!",
      data: result.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao atualizar aluno.";

    if (status === 400) msg = data?.message || "Requisição inválida.";
    else if (status === 404) msg = data?.message || "Aluno não encontrado.";
    else if (status === 409) msg = data?.message || "CPF já está em uso.";
    else if (status === 422) msg = data?.message || "Erro de validação (Zod).";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

// GET — listar/buscar alunos
const getStudent = async (studentData: {
  cpf?: string; 
  minAge?: number; 
  maxAge?: number; 
  gender?: "man" | "woman";
  nickname?: string; 
  guardianName?: string; 
  phoneNumber?: string; 
  beltId?: string; 
}): Promise<ApiResponse> => {
  try {
    let query = ""
    let itsFirst = true

    if (studentData.cpf) {
      query = `${query}cpf=${studentData.cpf}`
    }
    if (studentData.minAge) {
      if (itsFirst === true) {
        query = `${query}minAge=${studentData.minAge}`
        itsFirst = false
      } else {
        query = `${query}&minAge=${studentData.minAge}`
      }
    }
    if (studentData.maxAge) {
      if (itsFirst === true) {
        query = `${query}maxAge=${studentData.maxAge}`
        itsFirst = false
      } else {
        query = `${query}&maxAge=${studentData.maxAge}`
      }
    }
    if (studentData.gender) {
      if (itsFirst === true) {
        query = `${query}gender=${studentData.gender}`
        itsFirst = false
      } else {
        query = `${query}&gender=${studentData.gender}`
      }
    }
    if (studentData.nickname) {
      if (itsFirst === true) {
        query = `${query}nickname=${studentData.nickname}`
        itsFirst = false
      } else {
        query = `${query}&nickname=${studentData.nickname}`
      }
    }
    if (studentData.guardianName) {
      if (itsFirst === true) {
        query = `${query}guardianName=${studentData.guardianName}`
        itsFirst = false
      } else {
        query = `${query}&guardianName=${studentData.guardianName}`
      }
    }
    if (studentData.phoneNumber) {
      if (itsFirst === true) {
        query = `${query}phoneNumber=${studentData.phoneNumber}`
        itsFirst = false
      } else {
        query = `${query}&phoneNumber=${studentData.phoneNumber}`
      }
    }
    if (studentData.beltId) {
      if (itsFirst === true) {
        query = `${query}beltId=${studentData.beltId}`
        itsFirst = false
      } else {
        query = `${query}&beltId=${studentData.beltId}`
      }
    }
    const token = localStorage.getItem("token");
    const res = await api.get(`/student/search?${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      error: false,
      msg: res.data?.message || "Estudantes encontrados!",
      data: res.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao buscar alunos.";

    if (status === 400) msg = data?.message || "Requisição inválida.";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

const getStudentByBirthday = async (): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get(`/student/search/birthday`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      error: false,
      msg: res.data?.message || "Estudantes encontrados!",
      data: res.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao buscar alunos.";

    if (status === 400) msg = data?.message || "Requisição inválida.";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

const getStudentGradable = async (): Promise<ApiResponse> => {
  try {
    const token = localStorage.getItem("token");
    const res = await api.get(`/student/search/gradable`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      error: false,
      msg: res.data?.message || "Estudantes encontrados!",
      data: res.data,
    };
  } catch (e: any) {
    const status = e.response?.status;
    const data = e.response?.data;

    let msg = "Erro ao buscar alunos.";

    if (status === 400) msg = data?.message || "Requisição inválida.";
    else if (status >= 500) msg = "Erro interno no servidor.";

    return { error: true, status, msg };
  }
};

export const StudentProvider = ({ children }: StudentProviderProps) => {
  const value: studentProps = {
    onRegisterStudent: registerStudent,
    onDeleteStudent: deleteStudent,
    onPutStudent: putStudent,
    onGetStudent: getStudent,
    onGetStudentByBirthday: getStudentByBirthday,
    onGetStudentGradable: getStudentGradable
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};