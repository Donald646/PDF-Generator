from flask import Flask, request
from flask_restful import Api, Resource, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

#from dotenv import load_dotenv
#import openai
#load_dotenv()

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
CORS(app)

class PDFModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    file_name = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(50), nullable=False)

resource_fields = {
    "id": fields.Integer,
    "file_name": fields.String,
    "url": fields.String,
}


class PDF(Resource):
    @marshal_with(resource_fields)
    def get(self):
        result = PDFModel.query.all()
        return result, 200
    
    def post(self):
        data = request.get_json()
        print(data)
        new_pdf = PDFModel(file_name = data["file_name"], url = data["url"] )
        db.session.add(new_pdf)
        db.session.commit()
        return {'message':"file uploaded"}, 201

class HandlePrompt(Resource):
    def post(self):
        body = request.get_json()
        """
        openai.api_key = os.getenv('API_KEY')
        response = openai.Completion.create(
        model="gpt-3.5-turbo",
        messages=[
        {'role':'system', 'content':'You are an assistant that speaks like Shakespeare.'}, 
        {'role':'user', 'content':'tell me a joke'}]
        )   
        data = response.json()
        print(data)

        """



api.add_resource(PDF, "/pdf")
api.add_resource(HandlePrompt, "/handle-prompt")


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)