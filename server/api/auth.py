import os
import bcrypt
import datetime

from flask import (Blueprint,
                   current_app,
                   request,
                   session,
                   jsonify)

# AUTH ROUTE
auth = Blueprint('auth', __name__)

client = current_app.config['MONGO_CLIENT']
users_db = client[os.getenv('USER_DB')]
users_collection = users_db['users_collection']


@auth.route('/is_authenticated', methods=['GET'])
def is_authenticated():
    return jsonify({'is_authenticated': 'username' in session})


@auth.route('/login', methods=['POST'])
def login():
    body = request.get_json()
    email = body.get("email")
    password = body.get("password")

    user = users_collection.find_one({'email': email})

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password']):
        session['username'] = user['username']
        current_app.logger.info(f'User {user['username']} has logged in at {datetime.datetime.now()}')
        return jsonify({'user': session['username']}), 200
    else:
        return jsonify({'error': 'Incorrect Credentials'}), 401


@auth.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()
    username = body.get("username")
    email = body.get("email")
    password = body.get("password")

    existing_user = users_collection.find_one({'email': email})

    if not existing_user:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        users_collection.insert_one({'username': username, 'email': email, 'password': hashed_password})
        current_app.logger.info(f'User {username} signed up at {datetime.datetime.now()}')
        return 'Sign up successful', 201
    else:
        return jsonify({'error': 'User already exists'}), 400


@auth.route('/logout', methods=['POST'])
def logout():
    current_app.logger.info(f'User {session['username']} logged out at {datetime.datetime.now()}')
    session.pop('username', None)
    return 'successfully logged out', 200
