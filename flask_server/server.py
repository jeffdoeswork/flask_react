from distutils.log import debug
import imp

from flask import Flask, g, request
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime
from flask_cors import CORS 

#https://www.youtube.com/watch?v=RcQwcyyCOmM
#https://youtu.be/EAcD5ueqvHQ?t=517

#from sqlalchemy import create_engine
#engine = create_engine('postgresql+psycopg2://user:password@hostname/database_name')
app = Flask(__name__)

#add Database
#DB_URL = 'postgresql+psycopg2://{user}:{pw}@{url}/{db}'.format(user=POSTGRES_USER,pw=POSTGRES_PW,url=POSTGRES_URL,db=POSTGRES_DB)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://postgres:catdog123@localhost:5432/flask_db'
db = SQLAlchemy(app)

CORS(app)
#create db model
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    #create a string
    def __repr__(self):
        return f"Event: {self.description}"

    def __init__(self, description):
        self.description = description

def format_event(event):
    return {
        "description" : event.description,
        "id" : event.id,
        "created_at" : event.created_at
    }


@app.route("/")
def hello():
    return "Flask home"

#create and event
@app.route("/events", methods=['POST'])
def create_event():
    description = request.json['description']
    event = Event(description)
    db.session.add(event)
    db.session.commit()
    return format_event(event)

#get all events
@app.route("/events", methods=["GET"])
def get_events():
    events = Event.query.order_by(Event.id.asc()).all()
    event_list = []
    for event in events:
        event_list.append(format_event(event))
    return {'events': event_list}

#get stingle event
@app.route("/events/<id>", methods=["GET"])
def get_event(id):
    event = Event.query.filter_by(id=id).one()
    formated_event = format_event(event)
    return {'event' : formated_event}

#delete and event
@app.route("/events/<id>", methods=["DELETE"])
def delete_event(id):
    event = Event.query.filter_by(id=id).one()
    db.session.delete(event)
    db.session.commit()
    return f'Event (id: {id} deleted!'

#edit an event
@app.route("/events/<id>", methods=["PUT"])
def update_event(id):
    event = Event.query.filter_by(id=id)
    description = request.json['description']
    event.update(dict(description = description, created_at = datetime.utcnow()))
    db.session.commit()
    return {'event' : format_event(event.one())}

#members
@app.route("/members")
def members():
    return {"members" : ["member1", "member2", "member3"]}


if __name__ == "__main__":
    app.run(debug=True)