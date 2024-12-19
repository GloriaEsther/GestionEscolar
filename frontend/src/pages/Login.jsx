import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css";

const Login = () => {
  const [ClaveUsuario, setClaveUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

    const handleLogin = async (e) => {
      e.preventDefault();
      console.log("Iniciando sesión...");

      // Validación de campos
      if (!ClaveUsuario || !contrasena) {
        alert(error.message || "Datos incompletos");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
          body: JSON.stringify({ ClaveUsuario, contrasena }),
        });

        console.log("Estado de la respuesta:", response.status);
        const data = await response.json();
        const role = data?.usuario?.rol; // Extrae correctamente el rol 
        console.log("Datos recibidos del servidor:", data);
        if(response.ok){
          if (!role) {//si no esta
            //  setError("Rol no reconocido en la respuesta del servidor.");
              return;
            }
          // Navegación según el rol
          if (role === "administrativo") {
            navigate("/admin");
          } else if (role === "alumno") {
            navigate("/alumno");
          } else {
            setError("Rol no reconocido.");
          }
        }else{//si la respuesta es exitosa
          if(data.message.includes("incorrectos")){
            alert("Usuario o contrasena incorrectos,vuelve a intentarlo");
            setClaveUsuario("");//limpia las labeles
            setContrasena("");//x2
            return;
          }
        }  
      } catch (error) {
        console.error("Error al conectar con el servidor:", error);
        setError("Error al conectar con el servidor.");
      }
    };

  const goToRegister = () => {
    navigate("/register"); // Redirige a la página de registro
  };

  return (

    <div className="container">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="form-control">
          <input
            type="text"
            id="claveUsuario"
            placeholder=" "
            value={ClaveUsuario}
            onChange={(e) => setClaveUsuario(e.target.value)}
          />
          <label htmlFor="claveUsuario">Clave Usuario</label>
        </div>
        <div className="form-control">
          <input
            type="password"
            id="password"
            placeholder=" "
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
          <label htmlFor="password">Contraseña</label>
        </div>
        <button type="submit" className="btn">
          Iniciar Sesión
        </button>
      </form>
      <div className="link" onClick={goToRegister}>
        Registrarse
      </div>
    </div>
  );
};

export default Login;
