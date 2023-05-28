from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.init_app(app)

class Task(db.Model):
    ''' an individual task '''

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    description = db.Column(db.String, nullable=False)
    status = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    created_by = db.Column(db.String, nullable=False)
    priority = db.Column(db.String, nullable=False)