function Welcome(){

    const style = {
        bg: {
            borderRadius: '50px',
            backgroundColor: '#f8f9fa',
        }
    };
    return (
        <div className='container mt-5 col-6' style={style.bg}>
            <h1 className="mb-4 text-center">Bienvenido a texto_de_ejemplo</h1>
            <p className="col-6 mx-auto text-center">texto_de_ejemplo es una red social para compartir tus ideas con el mundo.</p>
            <p className="col-6 mx-auto text-center pb-4">Regístrate para empezar a publicar tus ideas y a comentar las de otros usuarios.</p>
        </div>
    );
}

export default Welcome;