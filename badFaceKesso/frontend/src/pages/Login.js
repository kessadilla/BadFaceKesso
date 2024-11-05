import LoginForm from '../components/LoginForm';
import { useState } from 'react';

function Login(){

    const style = {
        bg: {
          backgroundColor: '#f8f9fa',
        }
      };

    const [response, setResponse] = useState(''); 

    const sendData = ({user, contraseña}) => {
        fetch('http://172.16.221.29:5000/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({usuario:user, contraseña:contraseña})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        })
        .then(data => {
            setResponse(data.mensaje || 'No hay respuesta');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return(
        <div>
            <div className='mt-5'>
                <h1 className="text-center titulo">INICIA SESIÓN EN texto_de_ejemplo</h1>
                <LoginForm onRegistro={sendData}/>
            </div><br/>
            <p style={style.bg} className='text-center'>{response}</p>
        </div>
    );
}

export default Login;