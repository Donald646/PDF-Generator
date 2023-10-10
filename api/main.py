from flask import Flask, request
from flask_restful import Api, Resource, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os


from dotenv import load_dotenv
import openai
load_dotenv()

# TODO:
# None

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)
API_KEY = os.environ.get('API_KEY')
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
    def get(self):
        return {"messages": "successful"}, 200

    def post(self):
        data = request.get_json()

        hint = ""
        type = ""
        answers = ""

        if data['type'] == "advanced":
            content = data["prompt"]
        else:
            if data["hint"]:
                hint = "Include a hint at the end of each question."

            if data['questionType']:
                type = f"Make the type of problem a {data['questionType']}"

            if data['answerKey']:
                answers = "Include the answer key"

            content = f"Generate me a worksheet for grade {data['grade']} student, on the topic of {data['topic']}, and is {data['length']} questions long. {hint} {type}. {answers}"

        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a worksheet generator. You will generate math worksheets with the following: grade level, topic, and the length of the worksheet. Return the questions in a list and only return the questions no extra text."},

                # to tell the model how to return the questions
                {"role": "user", "content": "Generate me a worksheet for 7th graders on the topic of Algebra 1, that is 10 questions long."},
                {"role": "assistant", "content": '''
                    [
                                ["Simplify the expression: 3x + 2y - 4x - 7y",
                                " Solve the equation: 5x + 7 = 22", 
                                "Expand the expression: 2(x + 3y)", 
                                "Solve the equation: 2(3x - 4) = 10x - 6", 
                                "Simplify the expression: 4(x + 2) + 3(x - 1)", 
                                "Solve the equation: 2x/3 + 5 = 10", 
                                "Factorize the expression: 6x^2 - 15x.", 
                                "Solve the equation: 3(x - 4) - 2(x + 1) = 4x - 7.", 
                                "Solve the equation: 2x/5 - 1 = 3(x + 2)/10.", 
                                "Simplify the expression: 2(x - 1) - 3(2x + 1)."],
                    []
                    ]
                '''},

                # for hints
                {"role": "user", "content": "Generate me a math worksheet for grade 6 that is 10 questions long. Include a hint after every question. Make each type of problem a word problem."},
                {"role": "assistant", "content": '''
                [
                 [
                "John has 5 red apples and 3 green apples. How many apples does he have in total? (Hint: Add the number of red apples and green apples.)",
                "A bakery sold 48 cupcakes in the morning and 35 cupcakes in the afternoon. How many cupcakes did they sell in total? (Hint: Add the number of cupcakes sold in the morning and afternoon.)",
                "Samantha wants to buy a toy that costs $18. She has already saved $5. How much more money does she need to buy the toy? (Hint: Subtract the amount Samantha has saved from the cost of the toy.)",
                "There are 24 students in a class, and they need to be divided into 4 equal groups for a project. How many students will be in each group? (Hint: Divide the total number of students by the number of groups.)",
                "A rectangle has a length of 10 inches and a width of 6 inches. What is the perimeter of the rectangle? (Hint: The perimeter of a rectangle is the sum of all its sides.)",
                "During a week, Sarah read 20 pages of a book each day. How many pages did she read in total for the entire week? (Hint: Multiply the number of pages read each day by the number of days in a week.)",
                "If a movie ticket costs $8, how much will it cost for a family of 4 to go to the movies? (Hint: Multiply the cost of a single ticket by the number of family members.)",
                "There are 60 marbles in a bag, and 3/4 of them are blue. How many marbles are blue? (Hint: Find 3/4 of the total number of marbles.)",
                "A recipe calls for 1/2 cup of sugar, but Sarah only wants to make half of the recipe. How much sugar does she need? (Hint: Multiply 1/2 cup of sugar by 1/2 to find the amount needed for half the recipe.)",
                "A bicycle costs $150, and Mark has saved $75. How much more money does Mark need to buy the bicycle? (Hint: Subtract the amount Mark has saved from the cost of the bicycle.)",
                ],
                 []
                 ]
                 '''},

                # for answer keys
                {"role": "user", "content": "Generate me a math worksheet for grade 7 that is 5 questions long. Include a hint after every question. Make each type of problem a word problem. Include a answer key as well."},
                {"role": "assistant", "content": '''
                [
                    [
                        "Sam wants to buy a new bicycle that costs $240. He has already saved $120. How much more money does Sam need to save to buy the bicycle? (To find out how much more money Sam needs, subtract the amount he has saved from the cost of the bicycle.)",
                        "Emily is going on a road trip. She travels 150 miles on the first day and 200 miles on the second day. How many miles has she traveled in total so far? (To find the total distance traveled, add the number of miles traveled on each day.)",
                        "A box contains 24 chocolate bars. If Jane takes 7 chocolate bars, how many chocolate bars are left in the box? (To find out how many chocolate bars are left, subtract the number taken by Jane from the total number of chocolate bars.)",
                        "The temperature was 58°F in the morning, and it rose to 74°F in the afternoon. What was the temperature change throughout the day? (To find the temperature change, subtract the morning temperature from the afternoon temperature.)",
                        "Sarah is planning a party and wants to buy balloons. Each balloon costs $1.50, and she wants to buy 15 balloons. How much will Sarah spend on balloons for her party? (To calculate the total cost of balloons, multiply the cost per balloon by the number of balloons.)"
                    ],

                    [
                        "Sam needs to save $120 more to buy the bicycle.",
                        "Emily has traveled a total of 350 miles so far.",
                        "There are 17 chocolate bars left in the box.",
                        "The temperature change throughout the day was 16°F.",
                        "Sarah will spend $22.50 on balloons for her party."
                    ]
                 
                 ]
'''},
                # to handle cases with no hint and no answer key
                {"role": "user", "content": " Generate me a worksheet for grade 3 student, on the topic of Addition, and is 3 questions long.  Make the type of problem a Word Problems."},
                {"role": "assistant", "content":
                 '''
                    [
                        [
                            "Emma had 5 candies and her friend gave her 3 more. How many candies does Emma have in total?",
                            "There are 7 apples on the table, and 2 more apples fell from the tree. How many apples are there in total now? ",
                            "Tom has 4 toy cars, and his brother gave him 6 more toy cars as a gift. How many toy cars does Tom have in total now? "
                        ],
                        []
                    ]
                '''

                 },
                {"role": "user", "content": "Generate me a worksheet for grade 4 student, on the topic of Subtraction, and is 4 questions long. Include a hint at the end of each question. Make the type of problem a Word Problems."},
                {"role": "assistant", "content":
                 '''


                    [
                        [
                            "Sara had 12 pencils, but she lost 5 of them. How many pencils does Sara have now? (Hint: To find the answer, subtract the number of lost pencils from the initial number of pencils.)",
                            "There were 20 birds perched on a tree branch. 8 of them flew away. How many birds are left on the branch? (Hint: To find the answer, subtract the number of birds that flew away from the initial number of birds.)",
                            "Lucy had 36 stickers, and she gave 14 of them to her friend. How many stickers does Lucy have left? (Hint: To find the answer, subtract the number of stickers given to the friend from the initial number of stickers.)",
                            "A store had 50 cookies. Some customers bought 22 cookies. How many cookies are still in the store? (Hint: To find the answer, subtract the number of cookies bought by the customers from the initial number of cookies.)"
                        ],
                        []
                    ]
                '''
                 },

                {"role": "user", "content": content},
            ]
        )
        print(content)
        print(response['choices'][0]['message']['content'])

        return {"reply": response['choices'][0]['message']['content']}


api.add_resource(PDF, "/pdf")
api.add_resource(HandlePrompt, "/handle-prompt")


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    port = int(os.getenv('PORT'))
    app.run(debug=True, port=port)
