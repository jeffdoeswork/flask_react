#from sqlalchemy import create_engine
#from sqlalchemy.orm import scoped_session, sessionmaker
#from sqlalchemy.ext.declarative import declarative_base

#engine = create_engine('sqlite:////tmp/test.db')
#db_session = scoped_session(sessionmaker(autocommit=False,
#                                         autoflush=False,
#                                         bind=engine))
#Base = declarative_base()
#Base.query = db_session.query_property()

#def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
#    import yourapplication.models
#    Base.metadata.create_all(bind=engine)
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime
from server import db

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