//pagina de inicio administrativo
//import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./AltaAlumnoForm";
import { useNavigate } from "react-router-dom";
const Admin= () => {
  const [currentView, setCurrentView] = useState(""); // Para manejar qué componente mostrar

  const handleButtonClick = (view) => {
    setCurrentView(view);
  };
  const navigate = useNavigate();

  const renderView = () => {
    switch (currentView) {
      case "altaAlumno":
       // return <AltaAlumnoForm />;
       navigate('/altaalumno');
       return;
      case "reinscripcion":
       navigate('/altaalumnore'); 
        return;
      case "consultarExpediente":
        navigate('expedientealumno');
        return;
      case "cerrarSesion":
        navigate("/");
        return;
      default:
        return <h3>Selecciona una opción</h3>;
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Panel Administrativo</h1>
      <div>
        <button onClick={() => handleButtonClick("altaAlumno")}>
          Alta de Alumno
        </button>
        <button onClick={() => handleButtonClick("reinscripcion")}>
          Reinscripción
        </button>
        <button onClick={() => handleButtonClick("consultarExpediente")}>
          Consultar Expediente Alumno
        </button>
        <button onClick={() => handleButtonClick("cerrarSesion")}>
          Cerrar Sesión
        </button>
      </div>
      <div style={{ marginTop: "10px" }}>{renderView()}</div>
    </div>
  );
};

/*
function Admin() {
  return (
    <div>
      <h2>Bienvenido</h2>
      <p>en esta parte se mostraran las opciones para administrador</p>
      {}
    </div>
  );eran 10 px
}
*/
export default Admin;
