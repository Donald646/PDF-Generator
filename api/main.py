from flask import Flask, request
from flask_restful import Api, Resource, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os


from dotenv import load_dotenv
import openai
load_dotenv()

# TODO:
# Configure open ai api


app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
GPT_API_KEY = os.getenv("API_KEY")
openai.api_key = GPT_API_KEY
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
        new_pdf = PDFModel(file_name=data["file_name"], url=data["url"])
        db.session.add(new_pdf)
        db.session.commit()
        return {'message': "file uploaded"}, 201


class HandlePrompt(Resource):
    def post(self):
        data = request.get_json()
        if data['type'] == "advanced":
            content = data["prompt"]
        else:
            content = f"Generate me a worksheet for grade {data['grade']} student, on the topic of {data['topic']}, and is {data['length']} questions long."
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a worksheet generator. You will generate math worksheets with the following: grade level, topic, and the length of the worksheet. Return the questions in a list and only return the questions no extra text."},
                {"role": "user", "content": "Generate me a worksheet for 7th graders on the topic of Algebra 1, that is 10 questions long."},
                # if wanted to improve add more examples in the future
                {"role": "assistant",
                 "content": '["Simplify the expression: 3x + 2y - 4x - 7y", " Solve the equation: 5x + 7 = 22", "Expand the expression: 2(x + 3y)", "Solve the equation: 2(3x - 4) = 10x - 6", "Simplify the expression: 4(x + 2) + 3(x - 1)","Solve the equation: 2x/3 + 5 = 10", "Factorize the expression: 6x^2 - 15x.", "Solve the equation: 3(x - 4) - 2(x + 1) = 4x - 7.", "Solve the equation: 2x/5 - 1 = 3(x + 2)/10.", "Simplify the expression: 2(x - 1) - 3(2x + 1)."]'},
                {"role": "user", "content": content},
            ]
        )
        return {"reply": response['choices'][0]['message']['content']}


api.add_resource(PDF, "/pdf")
api.add_resource(HandlePrompt, "/handle-prompt")


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
