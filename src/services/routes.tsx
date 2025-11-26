import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";

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
import type { JSX } from "react";
import { useAuth } from "../context/authContext";

// Função para proteger rotas
function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { authState } = useAuth();

  if (authState.authenticated === null) {
    // Isso garante que as rotas só sejam carregadas após a verificação do estado de autenticação
    return <div>Carregando...</div>;
  }

  if (!authState.authenticated) {
    // Redireciona para a página de login se o usuário não estiver autenticado
    return <Navigate to="/Login" />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Initial />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/InsertPin" element={<InsertPin />} />

        {/* Rotas protegidas para Admin */}
        <Route element={<LayoutAdm />}>
          <Route path="/HomeAdm" element={
            <ProtectedRoute>
              <HomeAdm />
            </ProtectedRoute>
          } />
          <Route path="/ProfileAdm" element={
            <ProtectedRoute>
              <ProfileAdm />
            </ProtectedRoute>
          } />
          <Route path="/ProfileConfigAdm" element={
            <ProtectedRoute>
              <ProfileConfigAdm />
            </ProtectedRoute>
          } />
          <Route path="/ClassAdm" element={
            <ProtectedRoute>
              <ClassAdm />
            </ProtectedRoute>
          } />
          <Route path="/CreateClassAdm" element={
            <ProtectedRoute>
              <CreateClassAdm />
            </ProtectedRoute>
          } />
          <Route path="/EditClassAdm" element={
            <ProtectedRoute>
              <EditClassAdm />
            </ProtectedRoute>
          } />
          <Route path="/SpecificClassAdm" element={
            <ProtectedRoute>
              <SpecificClassAdm />
            </ProtectedRoute>
          } />
          <Route path="/ClassAttendanceAdm" element={
            <ProtectedRoute>
              <ClassAttendanceAdm />
            </ProtectedRoute>
          } />
          <Route path="/StudentsAdm" element={
            <ProtectedRoute>
              <StudentsAdm />
            </ProtectedRoute>
          } />
          <Route path="/CreateStudentsAdm" element={
            <ProtectedRoute>
              <CreateStudentsAdm />
            </ProtectedRoute>
          } />
          <Route path="/EditStudentsAdm" element={
            <ProtectedRoute>
              <EditStudentsAdm />
            </ProtectedRoute>
          } />
          <Route path="/SpecificStudentAdm" element={
            <ProtectedRoute>
              <SpecificStudentAdm />
            </ProtectedRoute>
          } />
          <Route path="/StudentsFromClassAdm" element={
            <ProtectedRoute>
              <StudentsFromClassAdm />
            </ProtectedRoute>
          } />
          <Route path="/WarningsAdm" element={
            <ProtectedRoute>
              <WarningsAdm />
            </ProtectedRoute>
          } />
          <Route path="/ControlGraduationAdm" element={
            <ProtectedRoute>
              <ControlGraduationAdm />
            </ProtectedRoute>
          } />
          <Route path="/MonitorsAdm" element={
            <ProtectedRoute>
              <MonitorsAdm />
            </ProtectedRoute>
          } />
        </Route>

        {/* Rotas protegidas para Monitor */}
        <Route element={<LayoutMonitor />}>
          <Route path="/HomeMonitor" element={
            <ProtectedRoute>
              <HomeMonitor />
            </ProtectedRoute>
          } />
          <Route path="/StudentsMonitor" element={
            <ProtectedRoute>
              <StudentsMonitor />
            </ProtectedRoute>
          } />
          <Route path="/CreateStudentsMonitor" element={
            <ProtectedRoute>
              <CreateStudentsMonitor />
            </ProtectedRoute>
          } />
          <Route path="/ProfileMonitor" element={
            <ProtectedRoute>
              <ProfileMonitor />
            </ProtectedRoute>
          } />
          <Route path="/ProfileConfigMonitor" element={
            <ProtectedRoute>
              <ProfileConfigMonitor />
            </ProtectedRoute>
          } />
          <Route path="/SpecificStudentMonitor" element={
            <ProtectedRoute>
              <SpecificStudentMonitor />
            </ProtectedRoute>
          } />
          <Route path="/EditStudentsMonitor" element={
            <ProtectedRoute>
              <EditStudentsMonitor />
            </ProtectedRoute>
          } />
          <Route path="/MonitorsMonitor" element={
            <ProtectedRoute>
              <MonitorsMonitor />
            </ProtectedRoute>
          } />
          <Route path="/EditClassMonitor" element={
            <ProtectedRoute>
              <EditClassMonitor />
            </ProtectedRoute>
          } />
          <Route path="/ClassMonitor" element={
            <ProtectedRoute>
              <ClassMonitor />
            </ProtectedRoute>
          } />
          <Route path="/SpecificClassMonitor" element={
            <ProtectedRoute>
              <SpecificClassMonitor />
            </ProtectedRoute>
          } />
          <Route path="/ClassAttendanceMonitor" element={
            <ProtectedRoute>
              <ClassAttendanceMonitor />
            </ProtectedRoute>
          } />
          <Route path="/WarningsMonitor" element={
            <ProtectedRoute>
              <WarningsMonitor />
            </ProtectedRoute>
          } />
          <Route path="/StudentsFromClassMonitor" element={
            <ProtectedRoute>
              <StudentsFromClassMonitor />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </Router>
  );
}
