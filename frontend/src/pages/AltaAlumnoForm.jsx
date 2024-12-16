import { useState } from "react";

const AltaAlumnoForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellidoPaterno: "",
    apellidoMaterno: "",
    curp: "",
    grado: "",
    fechaNacimiento: "",
    telefonoTutor: "",
    nombreTutor: "",
    apellidoPaternoTutor: "",
    apellidoMaternoTutor: "",
    correoTutor: "",
    registradoPor: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Datos del formulario:", formData);
    alert("Alumno registrado con éxito.");
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Alta de Alumno</h2>
      <div>
        <label>Nombre:</label>
        <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
      </div>
      <div>
        <label>Apellido Paterno:</label>
        <input
          type="text"
          name="apellidoPaterno"
          value={formData.apellidoPaterno}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Apellido Materno:</label>
        <input
          type="text"
          name="apellidoMaterno"
          value={formData.apellidoMaterno}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>CURP:</label>
        <input type="text" name="curp" value={formData.curp} onChange={handleChange} required />
      </div>
      <div>
        <label>Grado:</label>
        <input
          type="number"
          name="grado"
          value={formData.grado}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fecha de Nacimiento:</label>
        <input
          type="date"
          name="fechaNacimiento"
          value={formData.fechaNacimiento}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Número Telefónico del Tutor:</label>
        <input
          type="tel"
          name="telefonoTutor"
          value={formData.telefonoTutor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Nombre del Tutor:</label>
        <input
          type="text"
          name="nombreTutor"
          value={formData.nombreTutor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Apellido Paterno del Tutor:</label>
        <input
          type="text"
          name="apellidoPaternoTutor"
          value={formData.apellidoPaternoTutor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Apellido Materno del Tutor:</label>
        <input
          type="text"
          name="apellidoMaternoTutor"
          value={formData.apellidoMaternoTutor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Correo del Tutor:</label>
        <input
          type="email"
          name="correoTutor"
          value={formData.correoTutor}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Registrado Por:</label>
        <input
          type="text"
          name="registradoPor"
          value={formData.registradoPor}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Registrar Alumno</button>
    </form>
  );
};

export default AltaAlumnoForm;
