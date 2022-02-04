from server import app, db
from database import Event, format_event
from flask import Flask, g, request
from datetime import datetime


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

