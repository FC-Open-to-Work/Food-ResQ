import os

from flask import (Blueprint,
                   current_app,
                   session)

users_fridge = Blueprint('users_fridge', __name__)

client = current_app.config['MONGO_CLIENT']
users_db = client[os.getenv('USER_DB')]
users_fridge_collection = users_db['users_fridge_collection']


@users_fridge.route('/', methods=['GET'])
def get_ingredients():
    return 'Here are your ingredients', 200


@users_fridge.route('/', methods=['POST'])
def add_ingredient():
    users_fridge_collection.insert_one({'username': session['username'], 'ingredient': "tomato"})
    return 'Ingredient added', 201
