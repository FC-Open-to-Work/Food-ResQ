import os

from flask import (Blueprint,
                   current_app,
                   session,
                   jsonify)

users_fridge = Blueprint('users_fridge', __name__)

client = current_app.config['MONGO_CLIENT']
users_db = client[os.getenv('USER_DB')]
users_ingredients_collection = users_db['users_ingredients_collection']


@users_fridge.route('/', methods=['GET'])
def get_ingredients():
    ingredients = list(users_ingredients_collection.find({'email': session['email']}))
    ingredients_list = []
    for ingredient in ingredients:
        ingredients_list.append({
            '_id': str(ingredient['_id']),
            'name': ingredient['name']
        })

    return jsonify(ingredients_list), 200


@users_fridge.route('/', methods=['POST'])
def add_ingredient():
    new_ingredient = {
        'email': session['email'],
        'name': "potato"
    }

    result = users_ingredients_collection.insert_one(new_ingredient)

    if result.acknowledged:
        return jsonify({'message': 'Ingredient created successfully', '_id': str(result.inserted_id)}), 201
    else:
        return jsonify({'error': 'Ingredient creation failed'}), 500
