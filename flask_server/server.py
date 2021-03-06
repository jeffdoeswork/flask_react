from distutils.log import debug
import imp

from flask import Flask, g, request
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime
from flask_cors import CORS 
from config import Config
from flask_migrate import Migrate

#https://www.youtube.com/watch?v=RcQwcyyCOmM
#https://youtu.be/EAcD5ueqvHQ?t=517

#from sqlalchemy import create_engine
#engine = create_engine('postgresql+psycopg2://user:password@hostname/database_name')
app = Flask(__name__)
app.config.from_object(Config)

#add Database
#DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)
### Laptop
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:catdog123@localhost:5432/flask_db'
### Desktop
#app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://battle:catdog123@localhost:5432/postgres'
### Office
app.config['SQLALCHEMY_DATABASE_URI'] ="postgresql+psycopg2://postgres:gelaw01@localhost/postgres"


db = SQLAlchemy(app)
migrate = Migrate(app, db) # this

CORS(app)
#create db model



#if __name__ == "__main__":
#    app.run(debug=True)
import routes.routes, routes.routes_venue, database
