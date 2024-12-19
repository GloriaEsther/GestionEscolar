import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Alumno from "./pages/Alumno";
import AltaAlumnoForm from "./pages/AltaAlumnoForm";
import Reinscripcion from "./pages/Reinscripcion";
import ConsultarExpedienteAlumno from "./pages/ConsultarExpedienteAlumno";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/alumno" element={<Alumno />} />
        <Route path="/altaalumno" element={<AltaAlumnoForm />} />
        <Route path="/altaalumnore" element={<Reinscripcion />} />
        <Route path="/expedientealumno" element={<ConsultarExpedienteAlumno />} />
      </Routes>
    </Router>
  );
};

export default App;
