from flask import Flask
from config import Config
from flask_cors import CORS 
import server
from flask_sqlalchemy import SQLAlchemy 


app = Flask(__name__)
app.config.from_object(Config)


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://battle:catdog123@localhost:5432/postgres'

db = SQLAlchemy(app)

CORS(app)


