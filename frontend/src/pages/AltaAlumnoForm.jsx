import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AltaAlumno.css";
const AltaAlumnoForm = () => {
/*
  const [correo, setCorreo] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [curp, setCurp] = useState("");
  const [telefono, setTelefono] = useState("");
  const [registradoPor, setRegistradoPor] = useState(""); // Este campo lo asigna el administrativo
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  //const [error] = useState(""); // Mensaje de error
*/
  const [nombreAlumno, setNombreAlumno] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [curp, setCurp] = useState("");
  const [grado, setGrado] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [correo, setCorreo] = useState(""); // Correo del usuario (para verificar rol de alumno)
  const [nombreTutor, setNombreTutor] = useState("");
  const [apellidoPaternoT, setApellidoPaternoT] = useState("");
  const [apellidoMaternoT, setApellidoMaternoT] = useState("");
  const [correoT, setCorreoT] = useState("");
  const [numTelT, setNumTelT] = useState("");
  const [registradoPor, setRegistradoPor] = useState(""); // Clave del administrativo
  //const [claveUsuario, setClaveUsuario] = useState(""); // Clave del usuario
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault();

      if (!nombreAlumno || !apellidoPaterno || !apellidoMaterno || !curp || !grado || !fechaNacimiento || !correo || !nombreTutor || !apellidoPaternoT || !apellidoMaternoT || !numTelT || !correoT || !registradoPor /*|| !claveUsuario*/) {
        alert("Datos incompletos, por favor complete todos los campos.");
        return;
      }
      const alumnoData = {
        NombreAlumno: nombreAlumno,
        ApellidoPaterno: apellidoPaterno,
        ApellidoMaterno: apellidoMaterno,
        CURP: curp,
        Grado: grado,
        FechaNacimiento: fechaNacimiento,
        correo,
        NombreTutor: nombreTutor,
        ApellidoPaternoT: apellidoPaternoT,
        ApellidoMaternoT: apellidoMaternoT,
        correoT,
        NumtelT: numTelT,
        Registradopor: registradoPor, // Clave del administrativo que registra al alumno
       // ClaveUsuario: claveUsuario, // Clave del usuario asociado
      };
   // const alumnoData = { nombre, apellidoPaterno, apellidoMaterno, curp, correo, telefono, registradoPor };
    
   console.log("Datos enviados:", alumnoData);

    try {
      const response = await fetch("http://localhost:8000/api/alumnos/crearalumno", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alumnoData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("El alumno fue registrado exitosamente.");
        alert("El alumno fue registrado exitosamente");
       // navigate("/alumnos"); // Redirige a la página de alumnos, por ejemplo
      } else {
        setError(data.message || "Error al registrar el alumno");
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
      setError("Hubo un problema con la solicitud.");
    }
  };

  const Cancelar = () => {
    navigate("/admin"); // Redirige a la página de inicio de aadmin
  };

  const Regresar = () => {
    navigate("/admin"); // Redirige a la página anterior
  };

  return (
    <div className="register-form">
      <h2>Registrar Alumno</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Nombre Alumno"
          value={nombreAlumno}
          onChange={(e) => setNombreAlumno(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido Paterno"
          value={apellidoPaterno}
          onChange={(e) => setApellidoPaterno(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido Materno"
          value={apellidoMaterno}
          onChange={(e) => setApellidoMaterno(e.target.value)}
        />
        <input
          type="text"
          placeholder="CURP"
          value={curp}
          onChange={(e) => setCurp(e.target.value)}
        />
        <input
          type="number"
          placeholder="Grado"
          value={grado}
          onChange={(e) => setGrado(e.target.value)}
        />
          <input
          type="date"
          placeholder="Fecha de Nacimiento"
          value={fechaNacimiento}
          onChange={(e) => setFechaNacimiento(e.target.value)}
        />
         <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Nombre Tutor"
          value={nombreTutor}
          onChange={(e) => setNombreTutor(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido Paterno Tutor"
          value={apellidoPaternoT}
          onChange={(e) => setApellidoPaternoT(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido Materno Tutor"
          value={apellidoMaternoT}
          onChange={(e) => setApellidoMaternoT(e.target.value)}
        />
       <input
          type="text"
          placeholder="Telefono Tutor"
          value={numTelT}
          onChange={(e) =>setNumTelT(e.target.value)}
        />
        <input
          type="email"
          placeholder="Correo electrónico Tutor"
          value={correoT}
          onChange={(e) => setCorreoT(e.target.value)}
        />
        
        <input
          type="text"
          placeholder="Registrado por (nombre del administrativo)"
          value={registradoPor}
          onChange={(e) => setRegistradoPor(e.target.value)}
        />

        <button type="submit">Guardar</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button onClick={Cancelar}>Cancelar</button>
      <button onClick={Regresar}>Regresar</button>
    </div>
  );
};

export default AltaAlumnoForm;
