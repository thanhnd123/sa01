from flask import Blueprint, request, jsonify
import unittest
import json
from app import app, mongo, bcrypt
from werkzeug.security import generate_password_hash
from app.modules.user import get_table_users

BASE_URL = "http://127.0.0.1:5000"

# User credentials
USER_DATA = {
    "username": "admin",
    "email": "admin@example.com",
    "password": "admin1",
    "role": "admin"
}

def register():
    """Register a new user."""
    response = requests.post(f"{BASE_URL}/register", json=USER_DATA)
    print("Register Response:", response.status_code, response.json())

def login():
    """Login and retrieve JWT token."""
    response = requests.post(f"{BASE_URL}/login", json={
        "username": USER_DATA["username"],
        "password": USER_DATA["password"]
    })
    if response.status_code == 200:
        token = response.json().get("access_token")
        user_role = response.json().get("role")
        print("Login successful. Token:", token, "User Role:", user_role)
        return token
    else:
        print("Login failed:", response.status_code, response.json())
        return None

def protected_route(token):
    """Access protected route with JWT token."""
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(f"{BASE_URL}/protected", headers=headers)
    print("Protected Route Response:", response.status_code, response.json())

class AuthTest(unittest.TestCase):
    def setUp(self):
        # Configure test client
        self.app = app
        self.client = self.app.test_client()
        
        # Configure test database
        self.app.config['TESTING'] = True
        
        # Test user data
        self.test_user = {
            'email': 'test@example.com',
            'password': 'test123',
            'username': 'testuser',
            'role': 'user'
        }
        
        # Clear users collection and create test user
        with self.app.app_context():
            table_users = get_table_users()
            if isinstance(table_users, str):
                raise Exception(f"Failed to get users table: {table_users}")
                
            table_users.delete_many({})
            hashed_password = bcrypt.generate_password_hash(self.test_user['password']).decode('utf-8')
            table_users.insert_one({
                'email': self.test_user['email'],
                'password': hashed_password,
                'username': self.test_user['username'],
                'role': self.test_user['role']
            })

    def tearDown(self):
        # Clean up after each test
        with self.app.app_context():
            table_users = get_table_users()
            if not isinstance(table_users, str):
                table_users.delete_many({})

    def test_successful_login(self):
        """Test successful login with correct credentials"""
        response = self.client.post(
            '/api/auth/login',
            data=json.dumps({
                'email': self.test_user['email'],
                'password': self.test_user['password']
            }),
            content_type='application/json'
        )
        
        data = json.loads(response.data)
        self.assertEqual(response.status_code, 200)
        self.assertIn('access_token', data)
        self.assertIn('refresh_token', data)
        self.assertIn('user', data)
        self.assertEqual(data['user']['email'], self.test_user['email'])

    def test_login_invalid_email(self):
        """Test login with invalid email"""
        response = self.client.post(
            '/api/auth/login',
            data=json.dumps({
                'email': 'wrong@example.com',
                'password': self.test_user['password']
            }),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 401)
        data = json.loads(response.data)
        self.assertIn('error', data)

    def test_login_invalid_password(self):
        """Test login with invalid password"""
        response = self.client.post(
            '/api/auth/login',
            data=json.dumps({
                'email': self.test_user['email'],
                'password': 'wrongpassword'
            }),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 401)
        data = json.loads(response.data)
        self.assertIn('error', data)

    def test_login_missing_fields(self):
        """Test login with missing fields"""
        response = self.client.post(
            '/api/auth/login',
            data=json.dumps({'email': self.test_user['email']}),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.data)
        self.assertIn('error', data)

if __name__ == "__main__":
    register()
    token = login()
    if token:
        print(token)
        protected_route(token)

    unittest.main()
