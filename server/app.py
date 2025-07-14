from flask import Flask
from flask_cors import CORS
from routes.match import match_blueprint

app = Flask(__name__)
CORS(app)

app.register_blueprint(match_blueprint)

@app.route("/")
def home():
    return "ResumeScannerAI backend is running!"

if __name__ == "__main__":
    app.run(debug=True)
