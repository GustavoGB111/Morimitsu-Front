import { Routes, Route, Navigate } from "react-router-dom";
import Initial from "../pages/Initial";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import InsertPin from "../pages/InsertPin";

import LayoutAdm from "../Layouts/LayoutAdm";
import HomeAdm from "../PagesAdm/HomeAdm";
import ProfileAdm from "../PagesAdm/ProfileAdm";
import ProfileConfigAdm from "../PagesAdm/ProfileConfigAdm";
import ClassAdm from "../PagesAdm/ClassAdm";
import CreateClassAdm from "../PagesAdm/CreateClassAdm";
import EditClassAdm from "../PagesAdm/EditClassAdm";
import SpecificClassAdm from "../PagesAdm/SpecificClassAdm";
import ClassAttendanceAdm from "../PagesAdm/ClassAttendanceAdm";
import StudentsAdm from "../PagesAdm/StudentsAdm";
import CreateStudentsAdm from "../PagesAdm/CreateStudentsAdm";
import EditStudentsAdm from "../PagesAdm/EditStudentsAdm";
import SpecificStudentAdm from "../PagesAdm/SpecificStudentAdm";
import StudentsFromClassAdm from "../PagesAdm/StudentsFromClassAdm";
import WarningsAdm from "../PagesAdm/WarningsAdm";
import ControlGraduationAdm from "../PagesAdm/ControlGraduationAdm";
import MonitorsAdm from "../PagesAdm/MonitorsAdm";

import LayoutMonitor from "../Layouts/LayoutMonitor";
import HomeMonitor from "../PagesMonitor/HomeMonitor";
import StudentsMonitor from "../PagesMonitor/StudentsMonitor";
import CreateStudentsMonitor from "../PagesMonitor/CreateStudentsMonitor";
import ProfileMonitor from "../PagesMonitor/ProfileMonitor";
import ProfileConfigMonitor from "../PagesMonitor/ProfileConfigMonitor";
import SpecificStudentMonitor from "../PagesMonitor/SpecificStudentMonitor";
import EditStudentsMonitor from "../PagesMonitor/EditStudentsMonitor";
import MonitorsMonitor from "../PagesMonitor/MonitorsMonitor";
import EditClassMonitor from "../PagesMonitor/EditClassMonitor";
import ClassMonitor from "../PagesMonitor/ClassMonitor";
import SpecificClassMonitor from "../PagesMonitor/SpecificClassMonitor";
import ClassAttendanceMonitor from "../PagesMonitor/ClassAttendanceMonitor";
import WarningsMonitor from "../PagesMonitor/WarningsMonitor";
import StudentsFromClassMonitor from "../PagesMonitor/StudentsFromClassMonitor";
import { AuthProvider, useAuth } from "../context/authContext";
import { type ReactNode } from "react";

// Função para proteger rotas
function ProtectedRoute({ children }: { children: ReactNode }) {
  const { authState } = useAuth();

  if (authState.authenticated === null) {
    return <div>Carregando...</div>;
  }

  if (!authState.authenticated) {
    return <Navigate to="/Login" />;
  }

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <AuthProvider> 
      <Routes>
      <Route path="/" element={<Initial />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/InsertPin" element={<InsertPin />} />

      {/* Rotas protegidas Admin */}
      <Route element={<ProtectedRoute><LayoutAdm /></ProtectedRoute>}>
        <Route path="/HomeAdm" element={<HomeAdm />} />
        <Route path="/ProfileAdm" element={<ProfileAdm />} />
        <Route path="/ProfileConfigAdm" element={<ProfileConfigAdm />} />
        <Route path="/ClassAdm" element={<ClassAdm />} />
        <Route path="/CreateClassAdm" element={<CreateClassAdm />} />
        <Route path="/EditClassAdm" element={<EditClassAdm />} />
        <Route path="/SpecificClassAdm" element={<SpecificClassAdm />} />
        <Route path="/ClassAttendanceAdm" element={<ClassAttendanceAdm />} />
        <Route path="/StudentsAdm" element={<StudentsAdm />} />
        <Route path="/CreateStudentsAdm" element={<CreateStudentsAdm />} />
        <Route path="/EditStudentsAdm" element={<EditStudentsAdm />} />
        <Route path="/SpecificStudentAdm" element={<SpecificStudentAdm />} />
        <Route path="/StudentsFromClassAdm" element={<StudentsFromClassAdm />} />
        <Route path="/WarningsAdm" element={<WarningsAdm />} />
        <Route path="/ControlGraduationAdm" element={<ControlGraduationAdm />} />
        <Route path="/MonitorsAdm" element={<MonitorsAdm />} />
      </Route>

      {/* Rotas protegidas Monitor */}
      <Route element={<ProtectedRoute><LayoutMonitor /></ProtectedRoute>}>
        <Route path="/HomeMonitor" element={<HomeMonitor />} />
        <Route path="/StudentsMonitor" element={<StudentsMonitor />} />
        <Route path="/CreateStudentsMonitor" element={<CreateStudentsMonitor />} />
        <Route path="/ProfileMonitor" element={<ProfileMonitor />} />
        <Route path="/ProfileConfigMonitor" element={<ProfileConfigMonitor />} />
        <Route path="/SpecificStudentMonitor" element={<SpecificStudentMonitor />} />
        <Route path="/EditStudentsMonitor" element={<EditStudentsMonitor />} />
        <Route path="/MonitorsMonitor" element={<MonitorsMonitor />} />
        <Route path="/EditClassMonitor" element={<EditClassMonitor />} />
        <Route path="/ClassMonitor" element={<ClassMonitor />} />
        <Route path="/SpecificClassMonitor" element={<SpecificClassMonitor />} />
        <Route path="/ClassAttendanceMonitor" element={<ClassAttendanceMonitor />} />
        <Route path="/WarningsMonitor" element={<WarningsMonitor />} />
        <Route path="/StudentsFromClassMonitor" element={<StudentsFromClassMonitor />} />
      </Route>


    </Routes>
    </AuthProvider>
  );
}