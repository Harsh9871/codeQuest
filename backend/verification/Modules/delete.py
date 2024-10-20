from flask import jsonify

def delete_note():
    return jsonify({"error": "Note not found"}), 200
