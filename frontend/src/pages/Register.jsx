import { useState } from "react";

const Register = () => {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [rol, setRol] = useState("");
  const [extraFields, setExtraFields] = useState({});

  const handleRoleChange = (e) => {
    setRol(e.target.value);
    setExtraFields({});
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Datos enviados:", { correo, contrasena, rol, ...extraFields });
    // Aquí iría la lógica para registrar al usuario (llamada a API)
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
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

        {rol === "alumno" && (
          <>
            <input
              type="text"
              placeholder="Matrícula"
              onChange={(e) =>
                setExtraFields((prev) => ({
                  ...prev,
                  matricula: e.target.value,
                }))
              }
            />
          </>
        )}

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
