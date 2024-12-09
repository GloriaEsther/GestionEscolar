import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // Estado para el rol (alumno o administrativo)
  const [isRegistering, setIsRegistering] = useState(false); // Estado para alternar entre login y registro
  const navigate = useNavigate(); // Para redirigir al usuario después del login o registro

  /*const handleLogin = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para hacer login
    console.log("Logged in with:", email, password, role);
    // Redirige a la página de inicio o dashboard según el rol
    navigate(`/${role}`);
  };*/
  const handleLogin = (e) => {
    e.preventDefault();
    
    // Crear objeto con los datos del formulario
    const userData = {
      email: email,
      password: password,
      role: role,
    };
  
    // Enviar la solicitud POST al backend
    fetch('http://localhost:8000/login', {//5000
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login success:', data);
        // Redirigir al usuario dependiendo del rol
        navigate(`/${role}`);
      })
      .catch((error) => {
        console.error('Error during login:', error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para registrar al usuario (hacer la llamada API o agregar a la base de datos)
    console.log("Registering with:", email, password, role);
    // Redirige al login después del registro
    setIsRegistering(false);
  };

  return (
    <div>
      <h1>{isRegistering ? "Register" : "Login"}</h1>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {isRegistering && (
          <div>
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="alumno">Alumno</option>
              <option value="administrativo">Administrativo</option>
            </select>
          </div>
        )}

        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>

      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </button>
    </div>
  );
}

export default Login;
