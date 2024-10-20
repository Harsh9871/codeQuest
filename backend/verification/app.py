from flask import Flask, jsonify, request
from Modules.delete import delete_note

app = Flask(__name__)

@app.route('/delete')
def delete_api(): 
    return delete_note();


if __name__ == '__main__':
    app.run(debug=True)
