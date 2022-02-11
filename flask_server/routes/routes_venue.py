from server import app, db
from database import Venue, format_event
from flask import Flask, g, request
from datetime import datetime



#create and venue
@app.route("/venues", methods=['POST'])
def create_venue():
    description = request.json['description']
    venue = Venue(description)
    db.session.add(venue)
    db.session.commit()
    return format_event(venue)

#get all venues
@app.route("/venues", methods=["GET"])
def get_venues():
    venues = Venue.query.order_by(Venue.id.asc()).all()
    venue_list = []
    for venue in venues:
        venue_list.append(format_event(venue))
    return {'venues': venue_list}

#get stingle venue
@app.route("/venues/<id>", methods=["GET"])
def get_venue(id):
    venue = Venue.query.filter_by(id=id).one()
    formated_venue = format_event(venue)
    return {'venue' : formated_venue}

#delete and venue
@app.route("/venues/<id>", methods=["DELETE"])
def delete_venue(id):
    venue = Venue.query.filter_by(id=id).one()
    db.session.delete(venue)
    db.session.commit()
    return f'Venue (id: {id} deleted!'

#edit an event
@app.route("/venues/<id>", methods=["PUT"])
def update_venue(id):
    venue = Venue.query.filter_by(id=id)
    description = request.json['description']
    venue.update(dict(description = description, created_at = datetime.utcnow()))
    db.session.commit()
    return {'venue' : format_event(venue.one())}


