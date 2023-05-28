import unittest
from unittest import mock
from flask import Flask
from app import app, Task

class TestTasksAPI(unittest.TestCase):
    def setUp(self):
        app.testing = True
        self.client = app.test_client()

    @mock.patch('app.Task.query')
    def test_get_all_tasks(self, mock_query):
        # Create a mock Task object
        mock_task = Task(id=1, title='Task 1', description='Description 1',
                         status='Status 1', priority='Priority 1',
                         created_at='2022-01-01', created_by='User 1')

        # Set up the mock query object to return the mock task
        mock_query.all.return_value = [mock_task]

        with app.app_context():  # Create and activate application context
            with app.test_request_context():  # Create and activate request context
                try:
                    response = self.client.get('/tasks')
                    data = response.get_json()

                    # Assert the response status code
                    self.assertEqual(response.status_code, 200)

                    # Assert the response contains the expected data
                    self.assertIn('tasks', data)
                    self.assertIsInstance(data['tasks'], list)
                    self.assertEqual(len(data['tasks']), 1)

                except Exception as e:
                    self.fail(f"An exception occurred: {str(e)}")

    # def test_get_all_tasks_no_data(self):
    #     with mock.patch('app.Task.query') as mock_query:
    #         # Set up the mock query object to return an empty list
    #         mock_query.all.return_value = []

    #         with app.app_context():  # Create and activate application context
    #             with app.test_request_context():  # Create and activate request context
    #                 try:
    #                     response = self.client.get('/tasks')
    #                     data = response.get_json()

    #                     # Assert the response status code
    #                     self.assertEqual(response.status_code, 200)

    #                     # Assert the response contains the expected message
    #                     self.assertIn('message', data)
    #                     self.assertEqual(data['message'], 'No tasks found')

    #                 except Exception as e:
    #                     self.fail(f"An exception occurred: {str(e)}")

if __name__ == '__main__':
    unittest.main()