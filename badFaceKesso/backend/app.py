from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text, create_engine
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import select
import logging
from datetime import datetime
from sqlalchemy.orm import DeclarativeBase

app = Flask(__name__)
CORS(app)

#CONEXION A LA BASE DE DATOS
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://badfacekessouser:oracle11@localhost:5432/badfacedbdul?client_encoding=utf8'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = 'b4dfac3ss0k3'
db = SQLAlchemy(app)


#MODELO DE USUARIO
class User(db.Model):
    __tablename__ = 'users'  # Nombre de la tabla en la base de datos
    
    id = db.Column(db.Integer, primary_key=True)  # Columna de clave primaria
    username = db.Column(db.String(50), nullable=False, unique=True)  # Nombre de usuario
    password = db.Column(db.String(100), nullable=False)  # Contraseña
    registration_date = db.Column(db.DateTime, default=datetime.now)  # Fecha de registro
    def __repr__(self):
        return f'ID: {self.id}, Username: {self.username}, Password: {self.password}, Registration Date: {self.registration_date}'


#SOLICITUD DE REGISTRO
@app.route('/register', methods=['POST'])
def register():
    # Obtener los datos del cuerpo de la solicitud
    data = request.get_json()
    username = data.get('usuario', '')
    password = data.get('contraseña', '')

    username = username.strip()
    password = password.strip()

    # Validar los datos
    if not validateData(username, password):
        return jsonify({"mensaje": "Datos incorrectos"})

    saludo = f"Usuario: {username}"

   # Agregar usuario a la base de datos
    if addUser(username, password):
        respuesta = f"Usuario registrado con éxito. Hola {saludo}"
        return jsonify({"mensaje": respuesta})
    
    # En caso de error mostrar mensaje de error
    return jsonify({"mensaje": "Error al registrar usuario"})

#SOLICITUD DE INICIO DE SESION
@app.route('/login', methods=['POST'])
def login():

    data = request.get_json()
    username = data.get('usuario', '')
    password = data.get('contraseña', '')

    username = username.strip()
    password = password.strip()

    if not validateData(username, password):
        return jsonify({"mensaje": "Datos incorrectos"})
    
    user = checkUser(username, password)
    if user:
        session['user_id'] = user.id
        return jsonify({"mensaje": f"Bienvenido {username}"}) 
    return jsonify({"mensaje": "Usuario o contraseña incorrectos"})




#FUNCION PARA AGREGAR USUARIO
def addUser(username, password):
    try:
        # Crear un nuevo usuario
        newUser = User(username=username, password=password)
        # Agregar el usuario a la base de datos
        db.session.add(newUser)
        # Guardar los cambios
        db.session.commit()
        return True
    except SQLAlchemyError as e:
        db.session.rollback()
        logging.error(e)
        return False
    
#CHECKEO DE USUARIO
def checkUser(username, password):
    try:
        user = User.query.filter_by(username = username, password = password).first()
        return user
    except SQLAlchemyError as e:
        logging.error(e)
        return None
    except Exception as e:
        logging.error(e)
        return None

#FUNCION PARA VALIDAR DATOS
def validateData(username, password):
    if not username or not password:
        return False
    if ' ' in username or ' ' in password:
        return False
    return True



if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

#venv\Scripts\activate