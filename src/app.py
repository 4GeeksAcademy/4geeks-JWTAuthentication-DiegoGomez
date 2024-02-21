import os
from flask import Flask, request, jsonify, url_for, send_from_directory, session, redirect
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
<<<<<<< HEAD

from flask_jwt_extended import JWTManager, create_access_token,jwt_required, get_jwt_identity


#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = "ultra-secret"
jwt = JWTManager(app)

# database condiguration
if os.getenv("DATABASE_URL") is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
=======
from api.commands import setup_commands
from flask_cors import CORS
from werkzeug.security import check_password_hash
from functools import wraps

# Configura la aplicación Flask
app = Flask(__name__)
app.url_map.strict_slashes = False

# Configuración de CORS para permitir solo solicitudes desde el mismo dominio
CORS(app, origins="https://bookish-winner-rvqw75g9wj52wxr6-3000.app.github.dev")

# database configuration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
>>>>>>> 38adc73d17cd1437e82c3fbc8e1353c474f2577d
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

<<<<<<< HEAD
# any other endpoint will try to serve it like a static file
=======
# Decorador para verificar si el usuario está autenticado
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect('/login')
        return f(*args, **kwargs)
    return decorated_function

# Endpoint para el registro de usuarios
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Verifica si el usuario ya existe en la base de datos
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Email already exists'}), 400

    # Crea un nuevo usuario
    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'Signup successful'}), 201

# Endpoint para el inicio de sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    # Busca el usuario en la base de datos por correo electrónico
    user = User.query.filter_by(email=email).first()

    # Verifica si el usuario existe y si la contraseña es correcta
    if user and check_password_hash(user.password, password):
        # Autenticación exitosa, redirecciona al dashboard privado
        return jsonify({'message': 'Login successful'}), 200

    # Autenticación fallida, retorna un mensaje de error
    return jsonify({'message': 'Invalid email or password'}), 401

# Endpoint para la página privada
@app.route('/private')
@login_required
def private():
    return "Welcome to the private dashboard!"

>>>>>>> 38adc73d17cd1437e82c3fbc8e1353c474f2577d
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

<<<<<<< HEAD
=======
# Endpoint para el logout
@app.route('/logout')
def logout():
    # Elimina la sesión del usuario
    session.pop('user_id', None)
    return redirect('/login')

>>>>>>> 38adc73d17cd1437e82c3fbc8e1353c474f2577d
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
