from flask import Flask, redirect, jsonify, request, render_template
from models import connect_db, db, Task
from dotenv import load_dotenv
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
load_dotenv()
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')


with app.app_context():
    connect_db(app)

@app.route('/')
def home():
    return redirect('/tasks')

# VIEW ALL TASKS
@app.route('/tasks', methods=['GET'])
def get_all_tasks():
    """
    Get all tasks from the database
    """
    try:
        tasks = Task.query.all()
        tasks_data = []

        for task in tasks:
            task_data = {
                'id': task.id,
                'title': task.title,
                'description': task.description,
                'status': task.status,
                'priority': task.priority,
                'created_at': task.created_at,
                'created_by': task.created_by
            }
            tasks_data.append(task_data)

        if not tasks_data:
            return jsonify({'message': 'No tasks found'})
        return jsonify(tasks_data)
    except Exception as e:
        return jsonify({
            'error': str(e)
            })

#CREATE NEW TASK
@app.route('/tasks', methods=['POST'])
def create_task():
    """Create a new task and add it to the database"""

    data = request.get_json()

    title = data.get('title')
    description = data.get('description')
    status = data.get('status')
    priority = data.get('priority')
    created_by = data.get('created_by')
    created_at = data.get('created_at')

    try:
        task = Task(title=title, description=description, status=status, priority=priority,
                    created_by=created_by, created_at=created_at)
        db.session.add(task)
        db.session.commit()
    except Exception as e:
        return jsonify({'message': 'There was an error creating the task', 'error': str(e)}), 500

    return jsonify({'message': 'Task created successfully', 'task_id': task.id}), 201

# VIEW SPECIFIC TASK
@app.route('/tasks/<int:id>')
def get_task(id):
    """Route to get a single task by id"""
    try:
        task = Task.query.get(id)
        if task:
            return jsonify({'id': task.id, 'title': task.title, 'description': task.description,
                            'status': task.status, 'priority': task.priority, 'created_at':task.created_at,
                            'created_by': task.created_by})
        return jsonify({'message': 'Task not found'})
    except Exception as e:
        return jsonify({'error': str(e)})
    
# UPDATE TASK
@app.route('/task/<task_id>', methods=['PATCH'])
def update_task(task_id):
    """Updates a task with the given task ID.

    Args:
        task_id (int): The ID of the task to be updated.

    Returns:
        jsonify: A message indicating the task was updated successfully.
    """
    task = Task.query.get(task_id)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404

    data = request.get_json()

    title = data.get('title')
    description = data.get('description')
    status = data.get('status')
    priority = data.get('priority')
    created_by = data.get('created_by')
    created_at = data.get('created_at')

    if title:
        task.title = title
    if description:
        task.description = description
    if status:
        task.status = status
    if priority:
        task.priority = priority
    if created_by:
        task.created_by = created_by
    if created_at:
        task.created_at = created_at

    try:
        db.session.commit()
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    return jsonify({'message': 'Task updated successfully'})

# DELETE TASK
@app.route('/task/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    """
    Deletes a task by task_id
    """
    task = Task.query.get(task_id)
    if task is None:
        return jsonify({'error': 'Task not found'}), 404
    db.session.delete(task)
    db.session.commit()
    return jsonify({'message': 'Task deleted successfully'})

