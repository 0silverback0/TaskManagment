from app import app
from models import db, Task
import datetime

task = Task(
        title='Task 1',
        description='Task description',
        status='pending',
        created_at = datetime.datetime.now(),
        created_by='User 1',
        priority='High'
    )

with app.app_context():
    db.drop_all()
    db.create_all()

    db.session.add(task)
    db.session.commit()