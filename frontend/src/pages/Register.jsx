import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [correo, setCorreo] = useState(" " );
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");
  const [extraFields, setExtraFields] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // Mensaje de éxito
  const [emailError] = useState(""); // Error de correo duplicado

  const navigate = useNavigate();

  const handleRoleChange = (e) => {
    setRol(e.target.value);
    setExtraFields({});
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!correo || !contrasena || !rol) {// Si no ingresas correo, contraseña o rol(cualquier usuario)
      alert("Datos incompletos, intente de nuevo");
      return;
    }

    if (emailError) {
       console.log("Correo electronico existente");
      return;
    }
    if (contrasena.length > 10) {
      alert("La contraseña es demasiado larga, debe tener máximo 10 caracteres.");
      return; // Evita que continúe con el registro
    }

    //Validaciones en registro de admin(Datos incorrectos)
   
    if (rol === "administrativo") {
      const { nombre, apellidoPaterno, apellidoMaterno, telefono } = extraFields;
      if (!nombre || !apellidoPaterno || !apellidoMaterno || !telefono) {//este es de datos incompletos
        alert("Datos incompletos. Por favor, complete todos los campos.");
        return;
      }
      const nombreRegex = /^[a-zA-Z\s]+$/; // Solo letras y espacios
      const telefonoRegex = /^[0-9]+$/;   // Solo números
      
      if (!nombre || !nombreRegex.test(nombre)) {
        alert("Datos incorrectos, intente de nuevo");
        return;
      }else if (!apellidoPaterno || !nombreRegex.test(apellidoPaterno)) {
        alert("Datos incorrectos, intente de nuevo");
        return;
      }else if (!apellidoMaterno || !nombreRegex.test(apellidoMaterno)) {
        alert("Datos incorrectos, intente de nuevo");
        return;
      }else if (!telefono || !telefonoRegex.test(telefono)) {
        alert("Datos incorrectos, intente de nuevo");
        return;
      }
     }

   //
    const userData = { correo, contrasena, rol, ...extraFields };
    console.log("Datos enviados:", userData);
    try {
      // Llamada a la API de registro
      const response = await fetch("http://localhost:8000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
          if (data.ClaveAdmin && rol==="administrativo") {
            alert(`El usuario fue registrado exitosamente.\nClaveUsuario: ${data.ClaveUsuario}, ClaveAdmin: ${data.ClaveAdmin},Contraseña: ${contrasena}`);
            navigate("/admin");
          } else if(data.ClaveUsuario&& rol==="alumno") {
            alert(`El usuario fue registrado exitosamente.\nClaveUsuario: ${data.ClaveUsuario},Contrasena:${contrasena}`);
            navigate("/alumno");
          }
          setError("");
      } else {
        if (data.message.includes("existente")) {
          alert("Correo electronico existente");
          setCorreo("");//Limpiar campo correo
        }
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("Error en la llamada a la API:", error);
      setSuccessMessage("");
    }
  };

  const Cancelar = () => {
    navigate("/"); // Redirige a la página principal
  };

  const Regresar = () => {
    navigate("/"); // Redirige a la página anterior
  };

  return (
    <div className="register-form">
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        {emailError && <p className="error-message">{emailError}</p>} {/* Mostrar error si el correo ya está registrado */}

        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <select value={rol} onChange={handleRoleChange}>
          <option value="">Selecciona un rol</option>
          <option value="administrativo">Administrativo</option>
          <option value="alumno">Alumno</option>
        </select>

        {rol === "administrativo" && (
          <>
            <input
              type="text"
              placeholder="Nombre"
              onChange={(e) =>
                setExtraFields((prev) => ({ ...prev, nombre: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Apellido Paterno"
              onChange={(e) =>
                setExtraFields((prev) => ({
                  ...prev,
                  apellidoPaterno: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Apellido Materno"
              onChange={(e) =>
                setExtraFields((prev) => ({
                  ...prev,
                  apellidoMaterno: e.target.value,
                }))
              }
            />
            <input
              type="text"
              placeholder="Número de Teléfono"
              onChange={(e) =>
                setExtraFields((prev) => ({
                  ...prev,
                  telefono: e.target.value,
                }))
              }
            />
          </>
        )}

        <button type="submit">Guardar</button>
      </form>

      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}

      <button onClick={Cancelar}>Cancelar</button>
      <button onClick={Regresar}>Regresar</button>
    </div>
  );
};

export default Register;
