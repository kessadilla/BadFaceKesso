import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import React from 'react';

function Register() {

    const style = {
      bg: {
        backgroundColor: '#f8f9fa',
      }
    };
  
    const [respuesta , setRespuesta] = useState('');
  
    const sendData = ({user, contraseña}) => {
      /*192.168.1.132*/ /*172.16.221.29 clase*/ /*cambiar tmb en package.json*/
      fetch('http://172.16.221.29:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json' /*'text/plain'*/
        },
        body: JSON.stringify({usuario:user, contraseña:contraseña}) /*`usuario=${user}&contraseña=${contraseña}`*/
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        return response.json();
      })
      .then(data => {
        setRespuesta(data.mensaje || 'No hay respuesta');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    };
  
    return (
      <div>
        <div className='mt-5'>
          <h1 className="text-center titulo">REGÍSTRATE EN EL MEJOR FORO</h1>
          <LoginForm onRegistro={sendData}/>
        </div>
        
        <br></br>
        <div style={style.bg}>
          <p className='text-center'>{respuesta && respuesta}</p>
        </div>
      </div>
    );
  }
  
  
  export default Register; 