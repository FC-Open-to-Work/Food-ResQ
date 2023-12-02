import os
import logging

from dotenv import load_dotenv
from flask import (Flask,
                   session,
                   request)
from flask_cors import CORS
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

load_dotenv()

# APP SETUP
app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY')
app.logger.setLevel(logging.INFO)
CORS(app, resources={r"*": {"origins": "http://localhost:3000"}}, supports_credentials=True)

client = MongoClient(os.getenv('MONGO_URI'), server_api=ServerApi('1'))
try:
    client.admin.command('ping')
    app.logger.info('MongoDB connection: Success')
except Exception as e:
    app.logger.error(f'MongoDB connection: {e}')
app.config['MONGO_CLIENT'] = client

with app.app_context():
    from api.auth import auth
    app.register_blueprint(auth, url_prefix='/auth')

    from api.users_fridge import users_fridge
    app.register_blueprint(users_fridge, url_prefix='/users_fridge')


# SESSION AUTHENTICATION MIDDLEWARE SETUP
def is_authenticated():
    return 'email' in session


@app.before_request
def authentication_middleware():
    if not is_authenticated() and request.endpoint not in ['auth.login', 'auth.signup', 'auth.is_authenticated']:
        return 'Authentication required', 401


app.run(host='0.0.0.0', port=os.getenv('SERVER_PORT'), debug=os.getenv('DEBUG'))
