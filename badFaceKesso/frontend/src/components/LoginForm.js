import React, { useState } from 'react';
import '../styles/formStyle.css';

function FormularioRegistro({ onRegistro }) {

    const [user, setUser] = useState('');
    const [contraseña, setContraseña] = useState('');

    const manejarEnvio = (event) => {
      event.preventDefault();

      onRegistro({user, contraseña});
    };

  return (
    <div className="container mt-4">
      <form onSubmit={manejarEnvio} className="col-md-6 mx-auto">
        <div className="form-group input-camp">
          <label>Usuario:</label>
          <input 
            type="text" 
            className="form-control"
            onChange={(e) => setUser(e.target.value)} 
            value={user} 
            placeholder="Usuario"
          />
        </div>

        <div className="form-group input-camp">
          <label>Contraseña:</label>
          <input 
            type="password" 
            className="form-control"
            onChange={(e) => setContraseña(e.target.value)} 
            value={contraseña} 
            placeholder="Contraseña"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block mt-3 mx-auto d-block">Enviar</button>
      </form>
    </div>
  );
}

export default FormularioRegistro;
