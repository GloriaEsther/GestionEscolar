import { useState } from "react";
import { useNavigate } from "react-router-dom";
///todavia no sirven
const Login = () => {
  const [ClaveUsuario, setClaveUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Lógica para autenticar al usuario (puedes reemplazar esto con una API real)
    const mockRoles = {
      "admin@example.com": "administrativo",
      "student@example.com": "alumno",
    };

    const role = mockRoles[ClaveUsuario];
    if (role) {
      navigate(role === "administrativo" ? "/admin-dashboard" : "/student-dashboard");
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Clave Usuario"
          value={ClaveUsuario}
          onChange={(e) => setClaveUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
        <button type="submit">Iniciar Sesion</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};
export default Login;
